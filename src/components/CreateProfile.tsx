import { useState } from 'react';
import { TextField, Box, Button, Typography, Card } from '@mui/material';

function CreateProfile() {
  const [username, setUsername] = useState('');
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim.length === 0) {
      return;
    } //don't send data
    //check if username is taken! Make helper text dynamic
    //save locations to backend
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
          value={username}
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
