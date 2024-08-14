import React, { useState } from "react";
import {
  Button,
  TextInput,
  Select,
  Container,
  Center,
  Title,
} from "@mantine/core";
import axios from "axios";

const PetForm = ({
  entity,
  onSuccess,
}: {
  entity?: any;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState(
    entity || { name: "", age: "", race: "", type: "", pet_status: "in_adoption" }
  );
  console.log("entity", entity);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (entity) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}pets/${entity.id}`,
          formData
        );
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}pets`, formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save pet:", error);
    }
  };

  return (
    <Container>
      <Title mb="15px">Create New Pet</Title>
      <TextInput
        mt="10px"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextInput
        mt="10px"
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      <TextInput
        mt="10px"
        label="Race"
        name="race"
        value={formData.race}
        onChange={handleChange}
      />
      <Select
        label="Type"
        name="type"
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
        data={[
          { value: "dog", label: "Dog" },
          { value: "cat", label: "Cat" },
        ]}
      />
      <Center>
        <Button mt="20px" onClick={handleSubmit}>
          Save
        </Button>
      </Center>
    </Container>
  );
};

export default PetForm;
