import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { TextField, Box, Button, Typography, Card } from '@mui/material';

import { profileActions, uiActions } from '../store/store';

function CreateProfile() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const [newUsername, setUsername] = useState('');
  const [helperText, setHelperText] = useState('');

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
    //save locations to backend
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Profile Created Successfully',
        message: 'Your locations will now be saved',
      })
    );
    setUsername(''); //reset input
    //display a message that the profile was successfully created
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
