import React, { useState } from "react";
import { Button, TextInput, Container, Center, Title, Notification  } from "@mantine/core";
import axios from "axios";

const AdopterForm = ({ entity, onSuccess }: { entity?: any; onSuccess: () => void }) => {
  const [formData, setFormData] = useState(entity || { username: "", name: "", lastname: "", user_type: "adopter" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const title = !entity ? "Create New Adopter" : "Update Adopter";

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(formData.username)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    try {
        if (entity) {
            await axios.patch(`${process.env.REACT_APP_API_URL}users/${entity.id}`, formData);
        } else {
            formData.password = process.env.REACT_APP_PASSWORD_FOR_ADMIN_CREATED_USER
            await axios.post(`${process.env.REACT_APP_API_URL}users`, formData);
        }
    
      onSuccess();
    } catch (error) {
      setError("Failed to save adopter.");
    }
  };

  return (
    <Container >
    <Title mb="15px">{title}</Title>
    {error && (
        <Notification color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}
      <TextInput mt="10px" label="Email" name="username" value={formData.username} onChange={handleChange} />
      <TextInput mt="10px" label="Name" name="name" value={formData.name} onChange={handleChange} />
      <TextInput mt="10px" label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
      <Center>
        <Button mt="20px" onClick={handleSubmit}>Save</Button>
      </Center>
    </Container>
  );
};

export default AdopterForm;
