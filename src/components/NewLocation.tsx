import { useState } from 'react';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { fetchWeatherData } from '../store/weather-actions';

function NewLocation() {
  const [zipMode, setZipMode] = useState(false);

  const toggleZipMode = () => {
    setZipMode((prevState) => !prevState);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (zipMode) {
    } //send data to redux
  };

  let inputFields = (
    <>
      <Grid item>
        Please enter a city, state, and country, or{' '}
        <Link onClick={toggleZipMode}>input a ZIP code instead</Link>
      </Grid>
      <Grid item>
        <TextField name='city' id='city' label='City' required autoFocus />
      </Grid>
      <Grid item>
        <TextField name='state' id='state' label='State' autoFocus />
      </Grid>
      <Grid item>
        <TextField name='country' id='country' label='Country' autoFocus />
      </Grid>
    </>
  );

  if (zipMode) {
    inputFields = (
      <>
        <Grid item>
          Please enter a ZIP code or{' '}
          <Link onClick={toggleZipMode}>input a city instead</Link>
        </Grid>
        <Grid item>
          <TextField name='zip' id='zip' label='ZIP Code' autoFocus />
        </Grid>
        <Grid item>
          <TextField name='country' id='country' label='Country' autoFocus />
        </Grid>
      </>
    );
  }

  return (
    <Box component='form' noValidate onSubmit={submitHandler}>
      <Grid container spacing={2}>
        {inputFields}
      </Grid>
      <Button type='submit' fullWidth variant='contained'>
        Add location
      </Button>
    </Box>
  );
}

export default NewLocation;
