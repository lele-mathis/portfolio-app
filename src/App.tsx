import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './hooks/typedHooks';
import useWindowDimensions from './hooks/useWindowDimensions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';

import useFetchData from './hooks/useFetchData';
import { profileActions } from './store/profile-slice';
import { locationActions } from './store/location-slice';
import { firebaseUrl } from './store/info';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import WeatherRootLayout from './pages/WeatherRoot';
import HomePage from './pages/Home';
import WeatherHomePage from './pages/WeatherHome';
import DataPage from './pages/Data';
import LocationForecastPage from './pages/LocationForecast';

import { uiActions } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'weather',
        element: <WeatherRootLayout />,
        children: [
          { index: true, element: <WeatherHomePage /> },
          {
            path: ':locId',
            id: 'location-forecast',
            element: <LocationForecastPage />,
          },
        ],
      },
      { path: 'data', element: <DataPage /> },
    ],
  },
]);

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
          borderColor: '#bbb',
          '&:hover.homeCard': {
            backgroundColor: '#eee',
          },
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

function App() {
  const dispatch = useAppDispatch();
  const windowDimensions = useWindowDimensions();
  const isNarrowDevice = windowDimensions.width < 800;

  dispatch(uiActions.setIsNarrow(isNarrowDevice));

  theme.spacing(2);
  if (isNarrowDevice) {
    theme.spacing(1);
  }

  const { isLoading, fetchData: fetchLocations } = useFetchData();

  const storeLocations = (data: any) => {
    const { locations: loadedLocations } = data;
    dispatch(locationActions.setLocations(loadedLocations));
  };

  //look for profile in local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('profile');
    if (storedUser) {
      fetchLocations(
        `${firebaseUrl}/weather/${storedUser}.json`,
        'Could not find any saved locations for user ' + storedUser,
        storeLocations
      );
      dispatch(profileActions.logIn(storedUser)); //still log them in even if they have no saved locations
    }
  }, [dispatch, localStorage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
