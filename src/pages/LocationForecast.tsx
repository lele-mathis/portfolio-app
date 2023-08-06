import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Button, Typography, Card, Alert, AlertTitle } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import { fetchWeatherForecast } from '../store/weather-actions';
import Geocode from '../models/geocode';
import WeatherForecast from '../models/weatherForecast';
import ForecastPlots from '../components/ForecastPlots';

function LocationForecastPage() {
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
        return (
          <>
            <Alert severity={'error'} sx={{ m: 2 }}>
              <AlertTitle>
                Could not retrieve weather forecast for location with ID {locId}
              </AlertTitle>
              {error.message}
            </Alert>
            <Button component={Link} to='..'>
              <IoIosArrowBack className='icon' /> Back
            </Button>
          </>
        );
      });
  }
  if (!forecast) {
    return <></>;
  }

  const data = forecast.list;

  return (
    <>
      {forecast && (
        <Card variant='outlined' sx={{ m: 2, p: 2 }}>
          <Typography component='h2' variant='h5' sx={{ m: 1 }}>
            {forecast.city.name}, {location.admin1}, {location.country}
          </Typography>
          <Typography component='h3' variant='h6' sx={{ m: 1 }}>
            Weather forecast for the next 5 days
          </Typography>
          <ForecastPlots data={data} />
        </Card>
      )}
      <Button component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back
      </Button>
    </>
  );
}

export default LocationForecastPage;

//add a loader to get info about this locatioon
