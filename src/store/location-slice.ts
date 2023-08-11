import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Geocode from '../models/geocode';

const initialLocations: Geocode[] = [];

export const locationSlice = createSlice({
  name: 'location',
  initialState: { locations: initialLocations },
  reducers: {
    addLocation(state, action: PayloadAction<Geocode>) {
      if (!state.locations.find((loc) => loc.id === action.payload.id)) {
        state.locations = state.locations.concat(action.payload);
        //console.log(state.locations.map((loc) => loc.name + ', ' + loc.admin1));
      }
    },
    removeLocation(state, action: PayloadAction<string>) {
      //console.log('locations before: ' + state.locations.map((loc) => loc.id));
      state.locations = state.locations.filter(
        (loc) => loc.id != action.payload
      );
      //console.log('locations after: ' + state.locations.map((loc) => loc.id));
    },
    clearLocations(state) {
      state.locations = initialLocations;
    },
    setLocations(state, action: PayloadAction<Geocode[]>) {
      state.locations = action.payload;
    },
  },
});

export const locationActions = locationSlice.actions;
