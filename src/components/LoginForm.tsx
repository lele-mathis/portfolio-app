import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { TextField, Box, Button, Typography } from '@mui/material';
import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';

import { locationActions } from '../store/location-slice';

function LoginForm() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const username = useAppSelector((state) => state.profile.username);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [helperText, setHelperText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredUser = enteredUsername.trim();
    if (enteredUser.length === 0) {
      setHelperText('Enter your username');
      return;
    } //don't retrieve locations if no username entered
    if (!usersList.find((user) => user === enteredUser)) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error: Profile Not Found',
          message: 'Could not find profile for username ' + enteredUser,
        })
      );
      return;
    }

    //console.log('Fetching locations for user ' + enteredUser);

    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://react-http-3724a-default-rtdb.firebaseio.com/weather/${enteredUser}.json`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }

        const data = await response.json();
        const { locations: loadedLocations } = data;
        dispatch(locationActions.setLocations(loadedLocations));
        dispatch(profileActions.logIn(enteredUser));
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Logged in successfully!',
            message: '',
          })
        );
      } catch (err: any) {
        dispatch(
          uiActions.showNotification({
            status: 'warning',
            title: 'Could not find any saved locations for user ' + enteredUser,
            message: '',
          })
        );
        dispatch(profileActions.logIn(enteredUser)); //still log them in even if they have no saved locations
      }
      setIsLoading(false);
    };
    fetchLocations();
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
        Log in to your profile below to display saved locations:
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
        sx={{ my: 1 }}
      />
      <Button
        type='submit'
        disabled={isLoading}
        variant='contained'
        color='secondary'
        size='medium'
        sx={{ m: 1 }}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </Button>
    </Box>
  );
}
export default LoginForm;
