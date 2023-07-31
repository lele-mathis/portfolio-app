import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { TextField, Box, Button, Typography } from '@mui/material';
import { profileActions, uiActions } from '../store/store';

import useHttp from '../hooks/use-http';
import Geocode from '../models/geocode';
import { locationActions } from '../store/location-slice';

function LoginForm() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const username = useAppSelector((state) => state.profile.username);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [helperText, setHelperText] = useState('');
  const { isLoading, error, sendRequest: fetchLocations } = useHttp();

  useEffect(() => {
    if (error !== '') {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error Fetching Locations',
          message: error,
        })
      );
    }
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredUser = enteredUsername.trim();
    if (enteredUser.length === 0) {
      setHelperText('Enter your username');
      return;
    } //don't retrieve locations if no username entered
    // if (!usersList.find((user) => user === enteredUser)) {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error: Profile Not Found',
    //       message: 'Could not find profile for username ' + enteredUser,
    //     })
    //   );
    //   return;
    // }

    dispatch(profileActions.logIn(enteredUser));
    console.log('Fetching locations for user ' + enteredUser);

    //probably not working
    fetchLocations(
      {
        url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/${enteredUser}.json`,
        method: 'GET',
      },
      transformLocations
    ); //send HTTP request
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Logged in successfully!',
        message: 'User ' + enteredUser + ' is now logged in',
      })
    );
  };

  //runs after fetching locations on login
  const transformLocations = (data: any) => {
    //console.log('Fetched data: ' + JSON.stringify(data));
    const { locations: loadedLocations } = data;
    dispatch(locationActions.setLocations(loadedLocations));
  };

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredUsername(event.target.value);
  };
  return (
    <Box
      component='form'
      noValidate
      onSubmit={submitHandler}
      sx={{ mx: 'auto', textAlign: 'center' }}
    >
      <Typography>
        No locations to display - enter a location above, or login to your
        profile below to display saved locations.
      </Typography>
      <TextField
        name='username'
        id='username'
        label='Username'
        onChange={usernameChangeHandler}
        value={enteredUsername}
        helperText={helperText}
        error={helperText !== ''}
        variant='outlined'
        size='small'
        color='secondary'
        sx={{ m: 1 }}
      />
      <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>
        LOG IN
      </Button>
    </Box>
  );
}
export default LoginForm;
