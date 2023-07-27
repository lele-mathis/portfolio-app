import { createSlice, configureStore } from '@reduxjs/toolkit';
import Geocode from '../models/geocode';

const initialLocations: Geocode[] = [];

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: { locations: initialLocations },
  reducers: {
    addLocation(state, action) {
      state.locations.push(action.payload);
    },
    removeLocation(state, action) {
      //remove location from array
    },
  },
});

export const weatherActions = weatherSlice.actions;

const store = configureStore({
  reducer: { weather: weatherSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
