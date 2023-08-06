import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Button, Typography, Card } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';
import { Alert, AlertTitle } from '@mui/material';

import { fetchWeatherForecast } from '../store/weather-actions';
import { uiActions } from '../store/store';
import Geocode from '../models/geocode';
import WeatherForecast from '../models/weatherForecast';

function LocationForecastPage() {
  const dispatch = useAppDispatch();
  const locationList = useAppSelector((state) => state.location.locations);
  const [forecast, setForecast] = useState<WeatherForecast>();
  let { locId } = useParams();

  //move this into a loader?
  const location: Geocode | undefined = locationList.find(
    (loc) => loc.id == locId
  );
  if (location === undefined) {
    return (
      <>
        <Alert severity={'error'} sx={{ m: 2 }}>
          <AlertTitle>Could not find location with ID {locId}</AlertTitle>
        </Alert>
        <Button component={Link} to='..'>
          <IoIosArrowBack className='icon' /> Back
        </Button>
      </>
    );
  } else {
    fetchWeatherForecast(location)
      .then((value: WeatherForecast) => {
        setForecast(value);
      })
      .catch((error: any) => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error Retrieving Weather Forecast',
            message: error.message,
          })
        );
      });

    return (
      <>
        {forecast && (
          <Card variant='outlined' sx={{ m: 2, p: 2 }}>
            <Typography component='h2' variant='h5'>
              Weather Forecast for {forecast.city.name}
            </Typography>
            Location ID: {locId}
            <p>{JSON.stringify(forecast.list)}</p>
          </Card>
        )}
        <Button component={Link} to='..'>
          <IoIosArrowBack className='icon' /> Back
        </Button>
      </>
    );
  }
}

export default LocationForecastPage;

//add a loader to get info about this locatioon
