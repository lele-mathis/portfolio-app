import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import Geocode from '../models/geocode';

const initialLocations: Geocode[] = [];

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: { locations: initialLocations },
  reducers: {
    addLocation(state, action: PayloadAction<Geocode>) {
      state.locations = state.locations.concat(action.payload);
      //console.log('Adding location to' + state.locations);
    },
    removeLocation(state, action) {
      //remove location from array
    },
  },
});

export const weatherActions = weatherSlice.actions;

const initNotification = {
  status: '',
  message: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: initNotification },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

const store = configureStore({
  reducer: { weather: weatherSlice.reducer, ui: uiSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
