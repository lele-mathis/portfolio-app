import { useState } from 'react';
import { useAppDispatch } from '../hooks';

//import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Geocode from '../models/geocode';
import { weatherActions } from '../store/store';

import { geocodeCity, geocodeZip } from '../store/weather-actions';

function NewLocation() {
  const dispatch = useAppDispatch();
  const [zipMode, setZipMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cityInput, setCityInput] = useState('');

  const toggleZipMode = () => {
    setZipMode((prevState) => !prevState);
  };

  const cityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (zipMode) {
    } else {
      console.log('city: ' + cityInput);
      const geocodeData: Geocode = await geocodeCity(cityInput); //this returns a promise! Need to unwrap it
      dispatch(weatherActions.addLocation(geocodeData));
    } //send data to redux
    setCityInput('');
    setIsSubmitting(false);
  };

  //add this later with finding state and country codes
  //   const stateAndCountry = (
  //     <>
  //       <Grid item>
  //         <TextField name='state' id='state' label='State' autoFocus />
  //       </Grid>
  //       <Grid item>
  //         <TextField name='country' id='country' label='Country' autoFocus />
  //       </Grid>
  //     </>
  //   );
  let inputFields = (
    <>
      <Grid item>
        Please enter a city, state, and country or{' '}
        <Link onClick={toggleZipMode}>input a ZIP code instead</Link>
      </Grid>
      <Grid item>
        <TextField
          name='city'
          id='city'
          label='City'
          value={cityInput}
          onChange={cityChangeHandler}
          required
          autoFocus
        />
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
      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Finding location' : 'Add location'}
      </Button>
    </Box>
  );
}

export default NewLocation;
