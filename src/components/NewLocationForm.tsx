import { useState } from 'react';
import { useAppDispatch } from '../hooks';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

import Geocode from '../models/geocode';
import LocationMenu from './LocationMenu';
import { locationActions } from '../store/location-slice';
import { geocodeCity } from '../store/weather-actions';
import { uiActions } from '../store/store';

function NewLocation() {
  const dispatch = useAppDispatch();
  const [cityTouched, setCityTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
    city: '',
    state: '',
    country: '',
  });
  const [menuItems, setMenuItems] = useState<Geocode[] | null>(null);
  const menuOpen = menuItems !== null;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValues((prevState) => ({
      ...prevState,
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
      const geocodeList: Geocode[] = await geocodeCity(
        enteredValues.city,
        enteredValues.state,
        enteredValues.country
      );

      if (geocodeList.length === 1) {
        dispatch(locationActions.addLocation(geocodeList[0])); //send data to redux store
      } else {
        setAnchorEl(document.getElementById('city')); //find a better way to do this
        setMenuItems(geocodeList); //should open menu
      }
      setEnteredValues({ city: '', state: '', country: '' });
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
          value={enteredValues.city}
          helperText={
            cityTouched && enteredValues.city === '' && 'Enter a city name'
          }
          error={cityTouched && enteredValues.city === ''}
          onBlur={inputBlurHandler}
          size='small'
          required
        />
      </Grid>
      <Grid item>
        <TextField
          name='state'
          id='state'
          label='State/Region'
          onChange={inputChangeHandler}
          value={enteredValues.state}
          size='small'
        />
      </Grid>
      <Grid item>
        <TextField
          name='country'
          id='country'
          label='Country'
          onChange={inputChangeHandler}
          value={enteredValues.country}
          size='small'
        />
      </Grid>
    </>
  );

  const closeMenuHandler = (id: string) => {
    if (menuItems === null) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Internal Error',
          message: 'Possible locations not found',
        })
      );
      return;
    }
    // console.log(menuItems.map((item) => item.id));
    // console.log(id);
    if (id === 'all') {
      for (let location of menuItems) {
        dispatch(locationActions.addLocation(location)); //send data to redux store
      }
    } else {
      const chosenItem = menuItems.find((loc) => loc.id == id);

      if (chosenItem === undefined) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Internal Error',
            message: 'Selected location from menu not found',
          })
        );
      } else {
        dispatch(locationActions.addLocation(chosenItem));
      }
    }
    setMenuItems(null);
    setCityTouched(false);
  };

  return (
    <Card sx={{ m: 2, p: 2 }} variant='outlined'>
      <Box component='form' noValidate onSubmit={submitHandler}>
        <Grid container spacing={2}>
          {inputFields}
        </Grid>
        <Button
          type='submit'
          id='submit-location-button'
          fullWidth
          variant='contained'
          disabled={isSubmitting || enteredValues.city === ''}
          sx={{ my: 2 }}
        >
          <Typography color='secondaryLight'>
            {isSubmitting ? 'Finding location...' : 'Add location'}
          </Typography>
        </Button>
        {menuItems && (
          <LocationMenu
            open={menuOpen}
            items={menuItems}
            anchorEl={anchorEl}
            onClose={closeMenuHandler}
          />
        )}
      </Box>
    </Card>
  );
}

export default NewLocation;
