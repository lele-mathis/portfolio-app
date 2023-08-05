import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import WeatherRootLayout from './pages/WeatherRoot';
import HomePage from './pages/Home';
import WeatherHomePage from './pages/WeatherHome';
import DataPage from './pages/Data';
import LocationDetailPage from './pages/LocationDetail';

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
            id: 'location-detail',
            element: <LocationDetailPage />,
          },
        ],
      },
      { path: 'data', element: <DataPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
