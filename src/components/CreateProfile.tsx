import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { TextField, Box, Button, Typography } from '@mui/material';

import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';
import useSendData from '../hooks/useSendData';

function CreateProfile() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const locationsList = useAppSelector((state) => state.location.locations);
  const alert = useAppSelector((state) => state.ui.notification);
  const [newUsername, setUsername] = useState('');
  const [helperText, setHelperText] = useState('');
  const { isLoading, sendData: saveData } = useSendData();

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

    saveData({
      url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/${newUser}.json`,
      method: 'PUT',
      body: { locations: locationsList },
    }); //save locations to backend
    if (alert.status === '') {
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Profile Created Successfully',
          message: 'Your locations will now be saved',
        })
      ); //display a message that the profile was successfully created
    }
    setUsername(''); //reset input
  };

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  return (
    <Box
      component='form'
      noValidate
      onSubmit={submitHandler}
      sx={{ textAlign: 'center' }}
    >
      <Typography>Save your locations by creating a profile:</Typography>
      <TextField
        name='username'
        id='username'
        label='New Username'
        onChange={usernameChangeHandler}
        value={newUsername}
        helperText={helperText}
        error={helperText !== ''}
        variant='outlined'
        size='small'
        color='secondary'
        sx={{ my: 1 }}
      />
      <Button
        type='submit'
        variant='contained'
        color='secondary'
        size='medium'
        sx={{ m: 1 }}
        disabled={isLoading}
      >
        CREATE PROFILE
      </Button>
    </Box>
  );
}

export default CreateProfile;
