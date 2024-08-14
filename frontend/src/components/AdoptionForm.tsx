import React, { useState } from "react";
import { Button, TextInput, Select, Container, Center, Title } from "@mantine/core";
import axios from "axios";

const AdoptionForm = ({ entity, onSuccess }: { entity?: any; onSuccess: () => void }) => {
  const [formData, setFormData] = useState(entity || { adopter: 0, adopted_pet: 0, adoption_date: "", adoption_status: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        if (entity) {
            await axios.put(`${process.env.REACT_APP_API_URL}adoptions/${entity.id}`, formData);
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}adoptions`, formData);
        }
    
      onSuccess();
    } catch (error) {
      console.error("Failed to save adoption:", error);
    }
  };

  return (
    <Container >
    <Title mb="15px">Create New Adoption</Title>
      <TextInput mt="10px" label="Adopter Id" name="adopter" value={formData.adopter} onChange={handleChange} />
      <TextInput mt="10px" label="Adopted Pet id" name="adopted_pet" value={formData.adopted_pet} onChange={handleChange} />
      <Select
        label="Type"
        name="type"
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
        data={[
          { value: "done", label: "Done" },
          { value: "in_progress", label: "In Progress" },        ]}
      />
      <Center>
        <Button mt="20px" onClick={handleSubmit}>Save</Button>
      </Center>
    </Container>
  );
};

export default AdoptionForm;