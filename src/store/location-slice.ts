import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Geocode from '../models/geocode';

const initialLocations: Geocode[] = [];

export const locationSlice = createSlice({
  name: 'location',
  initialState: { locations: initialLocations },
  reducers: {
    addLocation(state, action: PayloadAction<Geocode>) {
      if (!state.locations.find((loc) => loc.name === action.payload.name)) {
        //Geocode objs don't have IDs?
        state.locations = state.locations.concat(action.payload);
      }
    },
    removeLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter(
        (loc) => loc.name !== action.payload
      );
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
