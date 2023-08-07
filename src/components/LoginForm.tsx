import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import { TextField, Box, Button, Typography } from '@mui/material';
import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';

import useFetchData from '../hooks/useFetchData';
import { locationActions } from '../store/location-slice';
import { firebaseUrl } from '../store/info';

function LoginForm() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  //const username = useAppSelector((state) => state.profile.username);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [helperText, setHelperText] = useState('');
  const { isLoading, fetchData: fetchLocations } = useFetchData();

  const storeLocations = (data: any) => {
    const { locations: loadedLocations } = data;
    dispatch(locationActions.setLocations(loadedLocations));
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Logged in successfully!',
        message: '',
      })
    );
  };

  //look for profile in local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('profile');
    if (storedUser) {
      fetchLocations(
        `${firebaseUrl}/weather/${storedUser}.json`,
        'Could not find any saved locations for user ' + storedUser,
        storeLocations
      );
      dispatch(profileActions.logIn(storedUser)); //still log them in even if they have no saved locations
    }
  }, [dispatch, localStorage]);

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
    fetchLocations(
      `${firebaseUrl}/weather/${enteredUser}.json`,
      'Could not find any saved locations for user ' + enteredUser,
      storeLocations
    );
    dispatch(profileActions.logIn(enteredUser)); //still log them in even if they have no saved locations
    localStorage.setItem('profile', enteredUser); //save that they are logged in to localStorage
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
