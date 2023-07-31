import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { Typography, Paper, Link, Grid } from '@mui/material';

import useHttp from '../hooks/use-http';
import Geocode from '../models/geocode';
import Weather from '../models/weather';
import NewLocation from '../components/NewLocation';
import WeatherGrid from '../components/WeatherGrid';
import Notification from '../ui/Notification';
import LoginForm from '../components/LoginForm';
import { fetchWeatherData } from '../store/weather-actions';
import { uiActions } from '../store/store';
import CreateProfile from '../components/CreateProfile';
import CurrentUser from '../components/CurrentUser';
import { profileActions } from '../store/profile-slice';

const initialState: Weather[] = [];

function WeatherHomePage() {
  const { isLoading, error, sendRequest: fetchUsers } = useHttp();
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.location.locations
  );
  const notification = useAppSelector((state) => state.ui.notification);
  const username = useAppSelector((state) => state.profile.username);
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const [weatherList, setWeatherList] = useState(initialState);

  //only run when the page renders for the first time
  useEffect(() => {
    fetchUsers(
      {
        url: 'https://react-http-3724a-default-rtdb.firebaseio.com/weather/users.json',
        method: 'GET',
      },
      (data: any) => {
        const { users: loadedUsers } = data;
        dispatch(profileActions.setUsersList(loadedUsers));
      }
    );
  }, []);

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

  let pageContent = (
    <p style={{ textAlign: 'center' }}>
      No locations to display - enter one above!
    </p>
  );

  if (username === '') {
    pageContent = (
      <>
        <LoginForm />
        <CreateProfile />
      </>
    );
  }

  if (locationsList.length !== 0) {
    pageContent = (
      <>
        <WeatherGrid weatherList={weatherList} />
        {username === '' && <CreateProfile />}
      </>
    );
  }

  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Typography component='h1' variant='h3' color='primary'>
        My Weather App
      </Typography>
      {notification.status !== '' && (
        <Notification notification={notification} />
      )}
      {username !== '' && <CurrentUser />}
      <NewLocation />
      {pageContent}
    </Paper>
  );
}

export default WeatherHomePage;
