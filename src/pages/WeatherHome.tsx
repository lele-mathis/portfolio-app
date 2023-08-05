import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { Typography, Paper, Link } from '@mui/material';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import WeatherLoc from '../models/weatherLoc';
import NewLocation from '../components/NewLocationForm';
import WeatherGrid from '../components/WeatherGrid';
import Notification from '../ui/Notification';
import { fetchWeatherData } from '../store/weather-actions';
import { uiActions } from '../store/store';

import ProfileManager from '../components/ProfileManager';
import useSendData from '../hooks/useSendData';

const initialState: WeatherLoc[] = [];

function WeatherHomePage() {
  const { isLoading: locationsSaving, sendData: saveLocations } = useSendData();
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.location.locations
  );
  const notification = useAppSelector((state) => state.ui.notification);
  const username = useAppSelector((state) => state.profile.username);
  const [weatherList, setWeatherList] = useState(initialState);

  const notificationCloseHandler = () => {
    dispatch(uiActions.closeNotification());
  };

  //remake the weather list and send the locationsList to the backend when the locationsList changes
  useEffect(() => {
    setWeatherList([]); //reset the list before refreshing it (this makes the DataGrid flash, maybe bad?)
    //console.log(locationsList.map((loc) => loc.name + ', ' + loc.admin1));
    for (let location of locationsList) {
      fetchWeatherData(location)
        .then((value: Weather) => {
          const newValue: WeatherLoc = {
            ...value,
            locationId: location.id,
            locationName: location.name,
            state: location.admin1,
            country: location.country,
          };
          setWeatherList((list) => list.concat(newValue));
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
    if (username !== '') {
      saveLocations({
        url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/${username}.json`,
        method: 'PUT',
        body: { locations: locationsList },
      });
    }
  }, [locationsList, saveLocations, username, dispatch]); //fetch the weather every time the list of locations changes

  let pageContent = (
    <p style={{ textAlign: 'center' }}>
      No locations to display - enter one above!
    </p>
  );

  if (locationsList.length !== 0) {
    pageContent = <WeatherGrid weatherList={weatherList} />;
  }

  return (
    <>
      <Paper sx={{ m: 2, p: 2 }}>
        <Typography component='h1' variant='h4' color='primary'>
          Weather App
        </Typography>
        {notification.status !== '' && (
          <Notification
            notification={notification}
            onClose={notificationCloseHandler}
          />
        )}
        <NewLocation />
        {pageContent}
        {locationsSaving && <p>Locations saving...</p>}
        <ProfileManager />
      </Paper>
      <div style={{ textAlign: 'center' }}>
        <Link href='https://github.com/lele-mathis/portfolio-app'>
          See the source code
        </Link>
      </div>
    </>
  );
}

export default WeatherHomePage;
