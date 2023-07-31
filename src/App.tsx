import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import WeatherHomePage from './pages/WeatherHome';
import DataPage from './pages/Data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'weather', element: <WeatherHomePage /> },
      { path: 'data', element: <DataPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
