import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../components/Header';
import Footer from '../components/Footer';

// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#450054',
      light: '#850062',
      dark: '#340034',
    },
    secondary: {
      main: '#ec6e4c',
      light: '#cb3030',
      dark: '#cb3030',
    },
    background: {
      default: '#ccc',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#ddd',
          '&.MuiDataGrid-columnHeaderTitle': { color: 'white' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#000',
          borderColor: '#ccc',
          '&.Mui-selected': {
            backgroundColor: '#450054',
            color: '#FFF',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#340034',
            color: '#FFF',
          },
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
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default RootLayout;
