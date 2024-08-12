import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, RadioGroup, Radio, Button, Container, Paper, Title } from '@mantine/core';
import { useAuth } from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {
  const { login, fetchUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length > 5 ? null : 'Password must be at least 6 characters long'
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      await login(values.email, values.password);
      fetchUser();
      navigate('/pets');
    } catch (err) {
      setError('Login failed, please try again.');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        size="h1"
      >
        Login
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
          <Button fullWidth mt="xl" type="submit">
            Confirm
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterView;
