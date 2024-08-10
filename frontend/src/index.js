import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MantineProvider
    theme={{ colorScheme: 'light' }} // You can customize the theme here
    withGlobalStyles
    withNormalizeCSS
  >
    <App />
  </MantineProvider>
);
