import React, { useState } from "react";
import { Button, TextInput, Container, Center, Title } from "@mantine/core";
import axios from "axios";

const VolunteerForm = ({ entity, onSuccess }: { entity?: any; onSuccess: () => void }) => {
  const [formData, setFormData] = useState(entity || { username: "", name: "", lastname: "", user_type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        if (entity) {
            await axios.put(`${process.env.REACT_APP_API_URL}volunteers`, formData);
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}volunteers/${entity.id}`, formData);
        }
    
      onSuccess();
    } catch (error) {
      console.error("Failed to save volunteer:", error);
    }
  };

  return (
    <Container >
    <Title mb="15px">Create New Volunteer</Title>
      <TextInput mt="10px" label="Email" name="email" value={formData.username} onChange={handleChange} />
      <TextInput mt="10px" label="Name" name="name" value={formData.name} onChange={handleChange} />
      <TextInput mt="10px" label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
      <Center>
        <Button mt="20px" onClick={handleSubmit}>Save</Button>
      </Center>
    </Container>
  );
};

export default VolunteerForm;
