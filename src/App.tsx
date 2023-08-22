import { useEffect, useCallback, lazy, Suspense } from 'react';
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
import { uiActions } from './store/ui-slice';

const WeatherHomePage = lazy(() => import('./pages/WeatherHome'));
const LocationForecastPage = lazy(() => import('./pages/LocationForecast'));
const DataPage = lazy(() => import('./pages/Data'));

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
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading weather homepage...</p>}>
                <WeatherHomePage />
              </Suspense>
            ),
          },
          {
            path: ':locId',
            id: 'location-forecast',
            element: (
              <Suspense fallback={<p>Loading location forecast...</p>}>
                <LocationForecastPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'data',
        element: (
          <Suspense fallback={<p>Loading data analytics projects...</p>}>
            <DataPage />
          </Suspense>
        ),
      },
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

  const storeLocations = useCallback(
    (data: any) => {
      const { locations: loadedLocations } = data;
      dispatch(locationActions.setLocations(loadedLocations));
    },
    [dispatch]
  );

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
  }, [dispatch, fetchLocations, storeLocations]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
