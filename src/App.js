import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import './styles/global.scss';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: '#177E89' },
      error: {
        main: '#d65a31',
      },
    },
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;