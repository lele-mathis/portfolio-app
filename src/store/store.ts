import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import Geocode from '../models/geocode';

const initialLocations: Geocode[] = [];

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: { locations: initialLocations },
  reducers: {
    addLocation(state, action: PayloadAction<Geocode>) {
      if (!state.locations.find((loc) => loc.name === action.payload.name)) {
        //Geocode objs don't have IDs?
        state.locations = state.locations.concat(action.payload);
      }
      // console.log(
      //   'Adding location ' +
      //     action.payload.name +
      //     ' to [' +
      //     state.locations.map((loc) => loc.name) +
      //     ']'
      // );
    },
    removeLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter(
        (loc) => loc.name !== action.payload
      ); //this isn't working....
      console.log(
        'Removed ' +
          action.payload +
          ' from [' +
          state.locations.map((loc) => loc.name) +
          ']'
      );
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

export const profileSlice = createSlice({
  name: 'profile',
  initialState: { username: '', isLoggedIn: false },
  reducers: {
    logIn(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
  },
});

const store = configureStore({
  reducer: { weather: weatherSlice.reducer, ui: uiSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
