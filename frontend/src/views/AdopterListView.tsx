import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Grid, Card, Loader } from '@mantine/core';
import axios from 'axios';
import { Adopter } from '../helper/interfaces';
import '../App.css'; 

const PetsListView: React.FC = () => {
  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdopters = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users?type=adopter`);
        setAdopters(response.data);
      } catch (err) {
        setError('Failed to load adopters.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdopters();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Container size="lg" my={40}>
      <Title>Adopters</Title>

      <Grid mt={30}>
        {adopters.map((adopter) => (
          <Grid.Col key={adopter.id} span={4}>
            <Card className="hover" shadow="md" padding="lg" radius="md" withBorder >
              <Text mt="md" fw={500} size="lg">{adopter.username}</Text>
              <Text mt="md">{adopter.name} {adopter.lastname}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PetsListView;
