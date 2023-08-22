import { useState, useEffect, lazy, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks';

import { Typography, Card } from '@mui/material';

import { fetchWeatherForecast } from '../../store/weather-actions';
import WeatherForecast from '../../models/weatherForecast';
import Geocode from '../../models/geocode';
import { uiActions } from '../../store/ui-slice';

const FiveDayForecast = lazy(() => import('./FiveDayForecast'));
const ForecastPlots = lazy(() => import('./ForecastPlots'));

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
  }, [location, dispatch]);

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
          <Suspense fallback={<p>Loading five-day forecast...</p>}>
            <FiveDayForecast data={forecast.list} />
          </Suspense>
          <Suspense fallback={<p>Loading graphs...</p>}>
            <ForecastPlots data={forecast.list} />
          </Suspense>
        </>
      ) : (
        <Typography component='h2' variant='h6' sx={{ m: m }}>
          Loading weather forecast for {location.name}
        </Typography>
      )}
    </Card>
  );
};

export default Forecast;
