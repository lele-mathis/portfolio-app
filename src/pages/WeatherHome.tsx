import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { Typography } from '@mui/material';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import NewLocation from '../components/NewLocation';
import Notification from '../components/Notification';
import { fetchWeatherData } from '../store/weather-actions';
import { weatherActions, uiActions } from '../store/store';

function WeatherHomePage() {
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.weather.locations
  );
  console.log('locationsList: ' + locationsList.map((loc) => loc.name));
  const notification = useAppSelector((state) => state.ui.notification);

  const initialState: Weather[] = [];
  const [weatherList, setWeatherList] = useState(initialState);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Location', width: 100 },
    { field: 'weather', headerName: 'Weather', width: 150 },
    { field: 'temp', headerName: 'Temperature (\xB0F)', width: 150 },
    { field: 'feelsLike', headerName: 'Feels Like (\xB0F)', width: 150 },
    { field: 'wind', headerName: 'Wind Speed (mph)', width: 150 },
    { field: 'clouds', headerName: 'Cloud Cover (%)', width: 150 },
    { field: 'rain', headerName: 'Rain in last hour (in)', width: 150 },
  ];

  let rows: GridRowsProp = [{ id: 'ID', main: 'Dummy data' }];

  useEffect(() => {
    setWeatherList([]); //reset the list before repopulating it
    for (let location of locationsList) {
      fetchWeatherData(location)
        .then((value: Weather) => {
          setWeatherList((list) => list.concat(value));
        })
        .catch((error: any) => {
          dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error Fetching Weather',
              message: error.message,
            })
          );
        });
    }
  }, [locationsList]); //fetch the weather every time the list of locations changes - NOT WORKING ON REMOVAL

  console.log('weatherList: ' + weatherList.map((weather) => weather.name));
  //turn weather objects into DataGrid rows
  rows = weatherList.map((value: Weather) => {
    if (value.rain === undefined) {
      value.rain = { '1h': 0 };
    }
    return {
      id: value.id,
      name: value.name,
      weather: value.weather[0].description,
      temp: value.main.temp,
      feelsLike: value.main['feels_like'],
      wind: value.wind.speed,
      clouds: value.clouds.all,
      rain: value.rain['1h'],
    };
  });

  const rowClickHandler: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    dispatch(weatherActions.removeLocation(params.row.name));
  };

  return (
    <>
      <Typography component='h1' variant='h3' color='primary'>
        My Weather App
      </Typography>
      {notification.status !== '' && (
        <Notification notification={notification} />
      )}
      <NewLocation />
      {locationsList.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          No locations found - enter a location above!
        </p>
      ) : (
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={rowClickHandler}
            density='compact'
          />
        </div>
      )}
    </>
  );
}

export default WeatherHomePage;
