import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Loader,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useAuth } from "../service/AuthContext";
import { Adoption } from "../helper/interfaces";
import '../App.css'; 

const AdoptionListView: React.FC = () => {
  const { user } = useAuth();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAdoptions = async () => {
      try {
        console.log("user.id", user.id);
        console.log("user.user_type", user.id);
        let url = ""
        if (user.user_type == "adopter") {
          url= `http://127.0.0.1:8000/api/adoptions?adopter=${user?.id}`;
        } else {
          url= `http://127.0.0.1:8000/api/adoptions`;
        }
        const response = await axios.get(url);
        const fetchedAdoptions: Adoption[] = response.data;

        setAdoptions(fetchedAdoptions);
      } catch (err) {
        setError("Failed to load adoptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAdoptions();
  }, [user?.id]);

  const handleApprove = async (adoptionId: number, petId: number) => {
    try {
      const adoption = adoptions.filter((adoption) => adoption.id == adoptionId)[0]
      adoption.adoption_status = "done"
      await axios.put(`http://127.0.0.1:8000/api/adoptions/${adoptionId}`, {
        ...adoption,
        adopted_pet: adoption.adopted_pet.id,
        adopter: adoption.adopter.id
      });

      const pet = adoption.adopted_pet;
      pet.pet_status = "adopted"
      await axios.put(`http://127.0.0.1:8000/api/pets/${petId}`,pet);

      setAdoptions((prev) =>
        prev.filter((adoption) => adoption.id !== adoptionId)
      );
    } catch (err) {
      console.error("Failed to approve adoption:", err);
      setError("Failed to approve adoption.");
    }
  };

  const handleReject = async (adoptionId: number, petId: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}adoptions/${adoptionId}`);

      const adoption = adoptions.filter((adoption) => adoption.id == adoptionId)[0]
      const pet = adoption.adopted_pet;
      pet.pet_status = "in_adoption"
      await axios.put(`http://127.0.0.1:8000/api/pets/${petId}`, pet);

      setAdoptions((prev) =>
        prev.filter((adoption) => adoption.id !== adoptionId)
      );
    } catch (err) {
      console.error("Failed to reject adoption:", err);
      setError("Failed to reject adoption.");
    }
  };

  if (loading) {
    return <Loader m="xl" />;
  }

  if (error) {
    return <Text c="red">{error}</Text>;
  }

  return (
    <Container size="lg" my={40}>
      {
        user.user_type == "adopter" ? <Title>Your Adoptions</Title> : <Title>Adoptions List</Title>
      }

      <Grid mt={30}>
        {adoptions.length < 1 ? (
          <Container size="lg" my={40}>
            <Text mt="md" fw={500} size="lg">
              You have no pending or accepted adoptions.
            </Text>
          </Container>
        ) : (
          adoptions.map((adoption) => (
            <Grid.Col key={adoption.id} span={4}>
              <Card className="hover" shadow="md" padding="lg" radius="md" withBorder>
                <Text mt="md" fw={500} size="xl">
                  {adoption.adopted_pet.name}
                </Text>
                <Text >{adoption.adopted_pet.type}</Text>
                <Text >
                  Age: {adoption.adopted_pet.age} years
                </Text>
                <Text >Race: {adoption.adopted_pet.race}</Text>
                <Text >
                  Status: {adoption.adopted_pet.pet_status}
                </Text>
                <Text >
                  Adopter Email: {adoption.adopter.username}
                </Text>
                <Text >
                  Adopter Name: {adoption.adopter.name} {adoption.adopter.lastname}
                </Text>
                <Text >
                  Status: {adoption.adopted_pet.pet_status}
                </Text>
                {user?.user_type !== "adopter" &&
                adoption.adopted_pet.pet_status === "awaiting_adoption" ? (
                  <Button m="sm"  onClick={() =>
                    handleApprove(adoption.id, adoption.adopted_pet.id)
                  }>Aprove</Button>
                ) : (
                  <Text></Text>
                )}
                {user?.user_type !== "adopter" &&
                adoption.adopted_pet.pet_status === "awaiting_adoption" ? (
                  <Button variant="outline" m="sm" color="red" onClick={() =>
                    handleReject(adoption.id, adoption.adopted_pet.id)
                  }>Reject</Button>
                ) : (
                  <Text></Text>
                )}
              </Card>
            </Grid.Col>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AdoptionListView;
