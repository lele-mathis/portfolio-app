import { useState } from 'react';
import { useAppDispatch } from '../hooks';

//import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Geocode from '../models/geocode';
import { locationActions } from '../store/location-slice';
import { geocodeCity } from '../store/weather-actions';
import { uiActions } from '../store/store';
import { Typography } from '@mui/material';

function NewLocation() {
  const dispatch = useAppDispatch();
  //const [zipMode, setZipMode] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputValues, setInputValues] = useState({
    city: '',
    state: '',
    country: '',
  });

  //   const toggleZipMode = () => {
  //     setZipMode((prevState) => !prevState);
  //   };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const inputBlurHandler = (event: any) => {
    if (event.target.name === 'city') {
      setCityTouched(true);
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(uiActions.closeNotification());
    setIsSubmitting(true);

    try {
      const geocodeData: Geocode = await geocodeCity(
        inputValues.city,
        inputValues.state,
        inputValues.country
      );

      dispatch(locationActions.addLocation(geocodeData)); //send data to redux
      setInputValues({ city: '', state: '', country: '' }); //not resetting state code to empty
    } catch (error: any) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Geocoding Error',
          message: error.message,
        })
      );
    }
    setIsSubmitting(false);
    setCityTouched(false);
  };

  let inputFields = (
    <>
      <Grid item>Enter a location to see the current weather there:</Grid>
      <Grid item>
        <TextField
          name='city'
          id='city'
          label='City'
          onChange={inputChangeHandler}
          value={inputValues.city}
          helperText='Enter a city name'
          error={cityTouched && inputValues.city === ''}
          onBlur={inputBlurHandler}
          size='small'
          required
        />
      </Grid>
      <Grid item>
        <TextField
          name='state'
          id='state'
          label='State Code'
          onChange={inputChangeHandler}
          value={inputValues.state}
          error={inputValues.state.length > 2}
          helperText='Enter a two-letter state code'
          size='small'
        />
      </Grid>
      <Grid item>
        <TextField
          name='country'
          id='country'
          label='Country Code'
          onChange={inputChangeHandler}
          value={inputValues.country}
          error={inputValues.country.length > 2}
          helperText='Enter a two-letter country code'
          size='small'
        />
      </Grid>
    </>
  );

  //   if (zipMode) {
  //     inputFields = (
  //       <>
  //         <Grid item>
  //           Please enter a ZIP code or{' '}
  //           <Link onClick={toggleZipMode}>input a city instead</Link>
  //         </Grid>
  //         <Grid item>
  //           <TextField name='zip' id='zip' label='ZIP Code' autoFocus />
  //         </Grid>
  //         <Grid item>
  //           <TextField name='country' id='country' label='Country' autoFocus />
  //         </Grid>
  //       </>
  //     );
  //   }

  return (
    <Card sx={{ m: 2, p: 2 }} variant='outlined'>
      <Box component='form' noValidate onSubmit={submitHandler}>
        <Grid container spacing={2}>
          {inputFields}
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          disabled={
            isSubmitting ||
            inputValues.city === '' ||
            inputValues.country.length > 2 ||
            inputValues.state.length > 2
          }
        >
          <Typography color='secondaryLight'>
            {isSubmitting ? 'Finding location...' : 'Add location'}
          </Typography>
        </Button>
      </Box>
    </Card>
  );
}

export default NewLocation;
