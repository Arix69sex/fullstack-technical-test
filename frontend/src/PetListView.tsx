// src/PetsListView.tsx
import React from 'react';
import { Container, Title, Text, Grid, Card } from '@mantine/core';

// Define a TypeScript interface for a Pet
interface Pet {
  id: number;
  name: string;
  age: number;
  type: string;
  pet_status: string;
}

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    age: 3,
    type: 'Dog',
    pet_status: 'Available',
  },
  {
    id: 2,
    name: 'Mittens',
    age: 2,
    type: 'Cat',
    pet_status: 'Available',
  },
  {
    id: 3,
    name: 'Rex',
    age: 5,
    type: 'Dog',
    pet_status: 'Adopted',
  },
  // Add more mock pets as needed
];

const PetsListView: React.FC = () => {
  return (
    <Container size="lg" my={40}>
      <Title >Pets Available for Adoption</Title>

      <Grid mt={30}>
        {mockPets.map((pet) => (
          <Grid.Col key={pet.id} span={4}>
            <Card shadow="md" padding="lg" radius="md" withBorder >
              <Text mt="md" fw={500} size="lg">{pet.name}</Text>
              <Text color="dimmed">{pet.type}</Text>
              <Text color="dimmed">Age: {pet.age} years</Text>
              <Text color="dimmed">Status: {pet.pet_status}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PetsListView;
