import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, RadioGroup, Radio, Button, Container, Paper, Title, MantineTheme } from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'

const theme = createTheme({
    /** Put your mantine theme override here */
  });

const RegisterView = () => {
  // Initialize the form with initial values and validation
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      lastname: '',
      role: 'adopter', // Default to 'adopter'
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 5 ? null : 'Password must be at least 6 characters long',
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      lastname: (value) => (value.length > 0 ? null : 'Last name is required'),
    },
  });

  // Form submission handler
  const handleSubmit = (values: typeof form.values) => {
    console.log(values); // This is where you would handle form submission
    // You might send a POST request to your backend with the form data
  };

  return (
    <Container size={420} my={40}>
      <Title
        size="h1"
      >
        Register
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <TextInput
            label="First Name"
            placeholder="John"
            required
            mt="md"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            mt="md"
            {...form.getInputProps('lastname')}
          />
          <RadioGroup
            label="Are you an adopter or a volunteer?"
            required
            mt="md"
            {...form.getInputProps('role')}
          >
            <Radio value="adopter" label="Adopter" />
            <Radio value="volunteer" label="Volunteer" />
          </RadioGroup>
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterView;
