import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Grid, Card, Loader, Button } from '@mantine/core';
import axios from 'axios';
import { useAuth } from '../service/AuthContext';
import { AttributeMap, Pet } from '../helper/interfaces';
import '../App.css'; 

const petStatus: AttributeMap = {
  in_adoption: "In adoption",
  adopted: "Adopted",
  awaiting_adoption: "Awaiting Adoption"
}

const PetsListView: React.FC = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const url = user?.user_type === "adopter" 
          ? `${process.env.REACT_APP_API_URL}pets?pet_status=in_adoption`
          : `${process.env.REACT_APP_API_URL}pets`;
        const response = await axios.get(url);
        const fetchedPets: Pet[] = response.data;

        setPets(fetchedPets);
      } catch (err) {
        setError('Failed to load pets.');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [user?.user_type]);

  const handleAdopt = async (petId: number) => {
    try {
      const adoptionData = {
        adopted_pet: petId,
        adopter: user?.id,
        adoption_date: new Date().toISOString().split('T')[0],
        adoption_status: "in_progress",
      };
      await axios.post(`${process.env.REACT_APP_API_URL}adoptions`, adoptionData);
      const petData = pets.filter(pet => pet.id === petId)[0];
      const data = Object.assign(petData, {
        "pet_status": "awaiting_adoption"
      });
      await axios.put(`${process.env.REACT_APP_API_URL}/pets/${petId}`, data);
      setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
    } catch (err) {
      setError('Failed to complete the adoption.');
    }
  };

  if (loading) {
    return <Loader m="xl" />;
  }

  if (error) {
    return <Text c="red" m="xl">{error}</Text>;
  }

  return (
    <Container size="lg" my={40} >
      <Title>Pets Available for Adoption</Title>

      {pets.length < 1 ? (
        <Container size="lg" my={40}>
          <Text mt="md" fw={500} size="lg">
            There are currently no pets for adoption.
          </Text>
        </Container>
      ) : (
        <Grid mt={30}>
          {pets.map((pet) => (
            <Grid.Col key={pet.id} span={4}>
              <Card
                className='hover'
                shadow="lg"
                padding="lg"
                radius="md"
                withBorder
              >
                <Text mt="md" fw={500} size="24px">{pet.name}</Text>
                <Text size="18px" m="5px">Type: {pet.type}</Text>
                <Text size="18px" m="5px">Age: {pet.age} years</Text>
                <Text size="18px" m="5px">Status: {petStatus[pet.pet_status]}</Text>
                {user?.user_type === "adopter" && pet.pet_status === "in_adoption" && (
                  <Button className='hoverButton' onClick={() => handleAdopt(pet.id)} m="5px">
                    Adopt
                  </Button>
                )}
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PetsListView;
