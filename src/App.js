import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Menu from './components/Menu';
import Routes from './routes';
import './styles/global.scss';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#d65a31',
      },
      secondary: {
        main: '#6baae6',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
