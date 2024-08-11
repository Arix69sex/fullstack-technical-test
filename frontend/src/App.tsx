import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, MantineProvider, createTheme } from '@mantine/core';
import RegisterView from './RegisterView';
import LoginView from './LoginView';
import AppRoutes from './AppRoutes';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'green',
});


function App() {
  return (
    <MantineProvider theme={theme}>
     <div className="App">
      <AppRoutes />
    </div>
    </MantineProvider>
  );
}

export default App;
