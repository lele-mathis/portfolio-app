import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../hooks/typedHooks';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

import useWindowDimensions from '../hooks/useWindowDimensions';
import Header from '../components/Header';
import Footer from '../components/Footer';

// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import { uiActions } from '../store/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#450054',
      light: '#850062',
      dark: '#340034',
    },
    secondary: {
      main: '#ec6e4c',
      light: '#eaa760',
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
          borderColor: '#bbb',
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
  const dispatch = useAppDispatch();
  const windowDimensions = useWindowDimensions();
  const isNarrowDevice = windowDimensions.width < 1000;

  dispatch(uiActions.setIsMobile(isNarrowDevice));
  if (isNarrowDevice) {
    theme.spacing(1);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {isNarrowDevice ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <Container maxWidth='xl'>
          <main>
            <Outlet />
          </main>
        </Container>
      )}

      <Footer />
    </ThemeProvider>
  );
}

export default RootLayout;
