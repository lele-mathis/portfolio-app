import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Header from '../components/Header';

// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#340442',
    },
    secondary: {
      main: '#ffa200',
    },
    background: {
      default: '#ccc',
      paper: '#ccc',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#ce9d4797',
        },
      },
    },
  },
});

theme.spacing(2);

function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth='lg'>
        <main>
          <Outlet />
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default RootLayout;
