import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';

import App from './App';
import { AuthProvider } from './hooks/auth';

import './index.css';

import reportWebVitals from './reportWebVitals';

// utilidad para crear colores rapido
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

// tema principal
const theme = createTheme({
  palette: {
    darkrose: createColor('#d7aeac'),
    rose: createColor('#efc8c8'),
    lightblue: createColor('#e8fafa'),
    darkblue: createColor('#364545'),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
