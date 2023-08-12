import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';

import { Typography, Card } from '@mui/material';

import { fetchWeatherForecast } from '../../store/weather-actions';
import WeatherForecast from '../../models/weatherForecast';
import Geocode from '../../models/geocode';
import ForecastPlots from './ForecastPlots';
import FiveDayForecast from './FiveDayForecast';
import { uiActions } from '../../store/store';

const Forecast: React.FC<{ location: Geocode }> = (props) => {
  const [forecast, setForecast] = useState<WeatherForecast>();
  const dispatch = useAppDispatch();
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);
  const { location } = props; //destructuring

  useEffect(() => {
    //put this in a loader?
    console.log('Fetching forecast for ' + location.name);
    fetchWeatherForecast(location)
      .then((value: WeatherForecast) => {
        setForecast(value);
      })
      .catch((error: any) => {
        console.log(`Error fetching forecast data for ${location.id}`);
        //redirect to error page
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error fetching forecast',
            message: `Could not retrieve forecast data for ${location.name} with ID ${location.id}`,
          })
        );
      });
  }, [location, fetchWeatherForecast, dispatch]);

  const m = isNarrow ? 1 : 2; //margins

  return (
    <Card variant={isNarrow ? 'elevation' : 'outlined'} sx={{ m: m, p: 1 }}>
      {forecast ? (
        <>
          <Typography component='h2' variant='h5' sx={{ m: 1 }}>
            {forecast.city.name}, {location.admin1}, {location.country}
          </Typography>
          {forecast.city.name !== location.name && (
            <Typography sx={{ mx: 2 }}>
              (Closest location found to {location.name})
            </Typography>
          )}

          <Typography component='h3' variant='h6' sx={{ m: 1 }}>
            Weather forecast for the next 5 days:
          </Typography>
          <FiveDayForecast data={forecast.list} />
          <ForecastPlots data={forecast.list} />
        </>
      ) : (
        <Typography component='h3' variant='h6' sx={{ m: m }}>
          Loading weather forecast...
        </Typography>
      )}
    </Card>
  );
};

export default Forecast;
