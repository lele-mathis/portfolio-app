import { useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim.length === 0) {
      return;
    } //don't retrieve locations if no username entered
    //send username to profile location fetcher
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
      sx={{ mx: 'auto', textAlign: 'center' }}
    >
      <Typography>
        Enter a location above, or login to your profile below to display saved
        locations:
      </Typography>
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
      <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>
        LOG IN
      </Button>
    </Box>
  );
}
export default LoginForm;
