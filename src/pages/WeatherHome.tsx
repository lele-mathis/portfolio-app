import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { Typography } from '@mui/material';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import NewLocation from '../components/NewLocation';
import WeatherGrid from '../components/WeatherGrid';
import Notification from '../ui/Notification';
import { fetchWeatherData } from '../store/weather-actions';
import { uiActions } from '../store/store';

function WeatherHomePage() {
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.weather.locations
  );
  //console.log('locationsList: ' + locationsList.map((loc) => loc.name));
  const notification = useAppSelector((state) => state.ui.notification);

  const initialState: Weather[] = [];
  const [weatherList, setWeatherList] = useState(initialState);

  useEffect(() => {
    setWeatherList([]); //reset the list before refreshing it (this makes the DataGrid flash, maybe bad?)
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
  }, [locationsList]); //fetch the weather every time the list of locations changes

  //console.log('weatherList: ' + weatherList.map((weather) => weather.name));

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
        <WeatherGrid weatherList={weatherList} />
      )}
    </>
  );
}

export default WeatherHomePage;
