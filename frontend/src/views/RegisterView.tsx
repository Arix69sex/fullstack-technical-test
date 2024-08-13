import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, RadioGroup, Radio, Button, Container, Paper, Title } from '@mantine/core';
import { useAuth } from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {
  const { register, login, fetchUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      lastname: '',
      userType: 'adopter',
    },

    validate: {
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 5 ? null : 'Password must be at least 6 characters long',
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      lastname: (value) => (value.length > 0 ? null : 'Last name is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      await register(values.email, values.password, values.name, values.lastname, values.userType);
      await login(values.email, values.password);
      fetchUser();
      navigate('/pets');
    } catch (err) {
      setError('Registration failed, please try again.');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title size="h1">Register</Title>

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
            {...form.getInputProps('userType')}
          >
            <Radio value="adopter" label="Adopter" />
            <Radio value="volunteer" label="Volunteer" />
          </RadioGroup>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
          )}
          <Button fullWidth mt="xl" type="submit">
            Confirm
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterView;
