import { configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './location-slice';
import { profileSlice } from './profile-slice';
import { uiSlice } from './ui-slice';

const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    ui: uiSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
