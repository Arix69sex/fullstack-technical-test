import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Grid, Card } from '@mantine/core';
import axios from 'axios';
import '../App.css'; 

interface Volunteer {
  id: number;
  name: string;
  lastname: string;
  username: string;
}

const VolunteerListView: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users?type=volunteer`);
        console.log("volunteers", volunteers)
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <Container size="lg" my={40}>
      <Title>Volunteers</Title>

      <Grid mt={30}>
        {volunteers.map((volunteer) => (
          <Grid.Col key={volunteer.id} span={4}>
            <Card className="hover" shadow="md" padding="lg" radius="md" withBorder>
              <Text mt="md" fw={500} size="lg">{volunteer.username}</Text>
              <Text mt="md">{volunteer.name} {volunteer.lastname}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default VolunteerListView;
