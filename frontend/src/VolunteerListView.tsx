// src/PetsListView.tsx
import React from 'react';
import { Container, Title, Text, Grid, Card } from '@mantine/core';

interface Volunteer {
    id: number;
    name: string;
    lastname: string;
    email: string;
  }
  
  const mockVolunteers: Volunteer[] = [
    {
      id: 1,
      name: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
    },
    {
      id: 2,
      name: 'Bob',
      lastname: "Smith",
      email: 'Bob.smith@example.com',
    },
    {
      id: 3,
      name: 'Carol',
      lastname: 'Davis',
      email: 'carol.davis@example.com'   
     },
  ];

const PetsListView: React.FC = () => {
  return (
    <Container size="lg" my={40}>
      <Title >Volunteers</Title>

      <Grid mt={30}>
        {mockVolunteers.map((adopter) => (
          <Grid.Col key={adopter.id} span={4}>
            <Card shadow="md" padding="lg" radius="md" withBorder>
                <Text mt="md" fw={500} size="lg">{adopter.email}</Text>
                <Text mt="md">{adopter.name} {adopter.lastname}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default PetsListView;
