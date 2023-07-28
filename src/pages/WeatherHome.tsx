import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';

import { Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import NewLocation from '../components/NewLocation';
import { fetchWeatherData } from '../store/weather-actions';

function WeatherHomePage() {
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.weather.locations
  );

  const initialState: Weather[] = [];
  const [weatherList, setWeatherList] = useState(initialState);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Location', width: 150 },
    { field: 'weather', headerName: 'Weather', width: 150 },
    { field: 'temp', headerName: 'Temperature (F)', width: 150 },
    { field: 'wind', headerName: 'Wind Speed (mph)', width: 150 },
    { field: 'clouds', headerName: 'Cloud Cover (%)', width: 150 },
  ];

  let rows: GridRowsProp = [{ id: 'ID', main: 'Dummy data' }];

  useEffect(() => {
    for (let location of locationsList) {
      fetchWeatherData(location)
        .then((value: Weather) => {
          setWeatherList((list) => list.concat(value));
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    }
  }, [locationsList]); //fetch the weather every time the list of locations changes

  //turn weather objects into DataGrid rows
  rows = weatherList.map((value: Weather) => {
    return {
      id: value.id,
      name: value.name,
      weather: value.weather[0].main + ': ' + value.weather[0].description,
      temp: value.main.temp,
      wind: value.wind.speed,
      clouds: value.clouds.all,
    };
  });

  return (
    <>
      <Typography component='h1' variant='h3' color='primary'>
        My Weather App
      </Typography>
      <NewLocation />
      {locationsList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          No locations found - enter a location above!
        </p>
      ) : (
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} density='compact' />
        </div>
      )}
    </>
  );
}

export default WeatherHomePage;
