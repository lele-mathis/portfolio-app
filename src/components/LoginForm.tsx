import { useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        variant='standard'
        size='small'
        color='secondary'
      />
      <Button type='submit' variant='contained' color='secondary'>
        Submit
      </Button>
    </Box>
  );
}
export default LoginForm;
