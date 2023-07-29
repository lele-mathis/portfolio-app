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

const noNotification = { status: '', title: '', message: '' };

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: noNotification },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    closeNotification(state) {
      state.notification = noNotification;
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
