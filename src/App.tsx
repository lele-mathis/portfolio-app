import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './hooks/typedHooks';

import useFetchData from './hooks/useFetchData';
import { profileActions } from './store/profile-slice';
import { locationActions } from './store/location-slice';
import { firebaseUrl } from './store/info';
import RootLayout from './pages/Root';
import WeatherRootLayout from './pages/WeatherRoot';
import HomePage from './pages/Home';
import WeatherHomePage from './pages/WeatherHome';
import DataPage from './pages/Data';
import LocationForecastPage from './pages/LocationForecast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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

function App() {
  const dispatch = useAppDispatch();
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

  return <RouterProvider router={router} />;
}

export default App;
