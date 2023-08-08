import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';

import {
  Button,
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import Geocode from '../models/geocode';
import LocationMenu from './LocationMenu';
import { locationActions } from '../store/location-slice';
import { geocodeCity } from '../store/weather-actions';
import { uiActions } from '../store/store';
import { statesList, countriesList } from '../store/info';

function NewLocationForm() {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector((state) => state.ui.isMobile);
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

  const cityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const autocompleteStateChangeHandler = (data: string) => {
    setEnteredValues((prevState) => ({
      ...prevState,
      state: data,
    }));
  };

  const autocompleteCountryChangeHandler = (data: string) => {
    setEnteredValues((prevState) => ({
      ...prevState,
      country: data,
    }));
  };

  const autocompleteChangeHandler = (data: string | null) => {
    return data;
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
    setEnteredValues({ city: '', state: '', country: '' });
  };

  let inputFields = (
    <>
      <Grid item>Enter a location to see the current weather there:</Grid>
      <Grid item>
        <TextField
          name='city'
          id='city'
          label='City or Postal Code'
          onChange={cityChangeHandler}
          value={enteredValues.city}
          error={cityTouched && enteredValues.city === ''}
          onBlur={inputBlurHandler}
          disabled={isSubmitting}
          size='small'
          sx={{ width: 150 }}
          required
        />
      </Grid>
      <Grid item>
        <Autocomplete
          freeSolo
          autoComplete
          autoSelect
          id='state-autocomplete'
          options={statesList}
          onChange={(e, data) => autocompleteChangeHandler(data)}
          onInputChange={(e, data) => autocompleteStateChangeHandler(data)}
          value={enteredValues.state}
          disabled={isSubmitting}
          renderInput={(params) => (
            <TextField
              {...params}
              name='state'
              id='state'
              label='State or Region'
              size='small'
              sx={{ width: 150 }}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          freeSolo
          autoComplete
          autoSelect
          id='country-autocomplete'
          options={countriesList}
          onChange={(e, data) => autocompleteChangeHandler(data)}
          onInputChange={(e, data) => autocompleteCountryChangeHandler(data)}
          value={enteredValues.country}
          disabled={isSubmitting}
          renderInput={(params) => (
            <TextField
              {...params}
              name='country'
              id='country'
              label='Country'
              size='small'
              sx={{ width: 150 }}
            />
          )}
        />
      </Grid>
    </>
  );

  //close without choosing
  const closeMenuHandler = () => {
    setMenuItems(null);
    setCityTouched(false);
  };

  const chooseMenuHandler = (id: string) => {
    if (id === '') {
      return;
    }
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
    closeMenuHandler();
  };

  const m = isMobile ? 1 : 2;

  return (
    <Card sx={{ m: m, p: m }} variant='outlined'>
      <Box component='form' noValidate onSubmit={submitHandler}>
        <Grid container spacing={2}>
          {inputFields}
        </Grid>
        <Button
          type='submit'
          id='submit-location-button'
          fullWidth
          variant='contained'
          disabled={isSubmitting}
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
            onChoose={chooseMenuHandler}
          />
        )}
      </Box>
    </Card>
  );
}

export default NewLocationForm;
