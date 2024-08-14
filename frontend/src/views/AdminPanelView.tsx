import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Group,
  Center,
  Flex,
  Container,
  Title,
} from "@mantine/core";
import PetForm from "../components/PetForm";
import UserForm from "../components/AdopterForm";
import AdoptionForm from "../components/AdoptionForm";
import AdopterForm from "../components/AdopterForm";
import VolunteerForm from "../components/VolunteerForm";

const AdminPanel = () => {
  const [pets, setPets] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [currentEntityType, setCurrentEntityType] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [petsData, adoptersData, volunteersData, adoptionsData] =
        await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}pets`),
          axios.get(`${process.env.REACT_APP_API_URL}users?type=adopter`),
          axios.get(`${process.env.REACT_APP_API_URL}users?type=volunteer`),
          axios.get(`${process.env.REACT_APP_API_URL}adoptions`),
        ]);

      console.log([petsData, adoptersData, volunteersData, adoptionsData]);

      setPets(petsData.data);
      setAdopters(adoptersData.data);
      setVolunteers(volunteersData.data);
      setAdoptions(adoptionsData.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleCreate = (entityType: string) => {
    setCurrentEntity(null);
    setCurrentEntityType(entityType);
    console.log("entity type", entityType);
    setModalOpen(true);
  };

  const handleEdit = (entityType: string, entity: any) => {
    setCurrentEntity(entity);
    setCurrentEntityType(entityType);
    setModalOpen(true);
  };

  const handleDelete = async (entityType: string, id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}${entityType}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const petRows = pets.map((pet) => (
    <Table.Tr key={pet["id"]}>
      <Table.Td>{pet["name"]}</Table.Td>
      <Table.Td>{pet["race"]}</Table.Td>
      <Table.Td>{pet["age"]}</Table.Td>
      <Table.Td>{pet["type"]}</Table.Td>
      <td>
        <Center>
          <Group>
            <Button onClick={() => handleEdit("pets", pet["id"])}>Edit</Button>
            <Button color="red" onClick={() => handleDelete("pets", pet["id"])}>
              Delete
            </Button>
          </Group>
        </Center>
      </td>
    </Table.Tr>
  ));

  const adoptionRows = adoptions.map((adoption) => (
    <Table.Tr key={adoption["id"]}>
      <Table.Td>{adoption["adopter"]["username"]}</Table.Td>
      <Table.Td>{adoption["adopted_pet"]["name"]}</Table.Td>
      <Table.Td>
        <Center>
          <Group justify="center" align="center">
            <Button onClick={() => handleEdit("adoption", adoption["id"])}>
              Edit
            </Button>
            <Button
              color="red"
              onClick={() => handleDelete("adoption", adoption["id"])}
            >
              Delete
            </Button>
          </Group>
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  const userRows = (entity: string) => {
    const items = entity == "adopter" ? adopters : volunteers;

    return items.map((item) => (
      <Table.Tr key={item["id"]}>
        <Table.Td>
          <Center> {item["username"]}</Center>
        </Table.Td>

        <Table.Td>
          <Center> {item["name"] + " " + item["lastname"]}</Center>
        </Table.Td>
        <td>
          <Center>
            <Group>
              <Button onClick={() => handleEdit(entity, item["id"])}>
                Edit
              </Button>
              <Button
                color="red"
                onClick={() => handleDelete(entity, item["id"])}
              >
                Delete
              </Button>
            </Group>
          </Center>
        </td>
      </Table.Tr>
    ));
  };

  const renderPetTable = () => {
    return (
      <Table
        w="80%"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        mt="20px"
        mb="20px"
      >
        <Table.Thead>
          <Table.Th ta="center">Name</Table.Th>
          <Table.Th ta="center">Race</Table.Th>
          <Table.Th ta="center">Age</Table.Th>
          <Table.Th ta="center">Pet Type</Table.Th>
          <Table.Th ta="center">Actions</Table.Th>
        </Table.Thead>
        <Table.Tbody>{petRows}</Table.Tbody>
      </Table>
    );
  };

  const renderUserTable = (userType: string) => {
    return (
      <Table
        w="80%"
        ta="center"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        mt="20px"
        mb="20px"
      >
        <Table.Thead>
          <Table.Th ta="center">Email</Table.Th>
          <Table.Th ta="center">Full Name</Table.Th>
          <Table.Th ta="center">Actions</Table.Th>
        </Table.Thead>
        <Table.Tbody>{userRows(userType)}</Table.Tbody>
      </Table>
    );
  };

  const renderAdoptionTable = () => {
    return (
      <Table
        w="80%"
        ta="center"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        mt="20px"
        mb="20px"
      >
        <Table.Thead>
          <Table.Th ta="center">Adopter</Table.Th>
          <Table.Th ta="center">Pet</Table.Th>
          <Table.Th ta="center">Actions</Table.Th>
        </Table.Thead>
        <Table.Tbody>{adoptionRows}</Table.Tbody>
      </Table>
    );
  };

  const tableSection = (
    sectionTitle: string,
    buttonName: string,
    entity: string,
    table: any
  ) => {
    return (
      <>
        <Container fluid h={50} m="10px">
          <Flex justify="center" align="center" gap="xl" direction="row">
            <h2>{sectionTitle}</h2>
            <Button onClick={() => handleCreate(entity)}>{buttonName}</Button>
          </Flex>
        </Container>
        <Center>{table}</Center>
      </>
    );
  };

  return (
    <div>
      <Title mt="50px" order={1}>
        Admin Panel
      </Title>

      {tableSection("Pets", "Create Pet", "pet", renderPetTable())}

      {tableSection(
        "Adopters",
        "Create Adopter",
        "adopter",
        renderUserTable("adopter")
      )}

      {tableSection(
        "Volunteers",
        "Create Volunteer",
        "volunteer",
        renderUserTable("volunteer")
      )}

      {tableSection(
        "Adoptions",
        "Create Adoption",
        "adoption",
        renderAdoptionTable()
      )}

      <Modal centered opened={modalOpen} onClose={() => setModalOpen(false)}>
        {currentEntityType === "pet" && (
          <PetForm
            entity={currentEntity}
            onSuccess={() => {
              setModalOpen(false);
              fetchData();
            }}
          />
        )}

        {currentEntityType === "volunteer" && (
          <VolunteerForm
            entity={currentEntity}
            onSuccess={() => {
              setModalOpen(false);
              fetchData();
            }}
          />
        )}

        {currentEntityType === "adopter" && (
          <AdopterForm
            entity={currentEntity}
            onSuccess={() => {
              setModalOpen(false);
              fetchData();
            }}
          />
        )}

        {currentEntityType === "adoption" && (
          <AdoptionForm
            entity={currentEntity}
            onSuccess={() => {
              setModalOpen(false);
              fetchData();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminPanel;
