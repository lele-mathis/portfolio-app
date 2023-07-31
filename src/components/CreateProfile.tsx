import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { TextField, Box, Button, Typography, Card } from '@mui/material';

import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';
import useHttp from '../hooks/use-http';

function CreateProfile() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const locationsList = useAppSelector((state) => state.location.locations);
  const [newUsername, setUsername] = useState('');
  const [helperText, setHelperText] = useState('');

  const { isLoading, error, sendRequest: saveData } = useHttp();

  //running before new user is added? Fix this!
  useEffect(() => {
    //don't override with nothing!
    if (usersList.length !== 0) {
      saveData(
        {
          url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/users.json`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users: usersList }),
        },
        () => {
          console.log('usersList ' + usersList + ' saved to Firebase');
        }
      );
    }
  }, [usersList]);

  useEffect(() => {
    if (error !== '') {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error in CreateProfile',
          message: error,
        })
      );
    }
  }, [error]);

  //send usersList to backend whenever it changes - not working properly?

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHelperText('');
    dispatch(uiActions.closeNotification());
    const newUser = newUsername.trim();
    if (newUser.length === 0) {
      setHelperText('Enter a non-empty string');
      return;
    } //don't send data, show error?
    if (usersList.find((user) => user === newUser)) {
      setHelperText('Username ' + newUser + ' is taken'); //check if username is taken!
      return;
    }

    dispatch(profileActions.addProfile(newUser)); //add to profile list

    saveData(
      {
        url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/${newUser}.json`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locations: locationsList }),
      },
      saveLocationSuccess
    ); //save locations to backend
  };

  const saveLocationSuccess = () => {
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Profile Created Successfully',
        message: 'Your locations will now be saved',
      })
    ); //display a message that the profile was successfully created
    setUsername(''); //reset input
  };

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  return (
    <Card variant='outlined' sx={{ mx: 'auto', my: 1, p: 1, maxWidth: 450 }}>
      <Box
        component='form'
        noValidate
        onSubmit={submitHandler}
        sx={{ mx: 'auto', textAlign: 'center' }}
      >
        <Typography>Save your locations by creating a profile:</Typography>
        <TextField
          name='username'
          id='username'
          label='Username'
          onChange={usernameChangeHandler}
          value={newUsername}
          helperText={helperText}
          error={helperText !== ''}
          variant='outlined'
          size='small'
          color='secondary'
          sx={{ m: 1 }}
        />
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          sx={{ m: 1 }}
        >
          CREATE PROFILE
        </Button>
      </Box>
    </Card>
  );
}

export default CreateProfile;
