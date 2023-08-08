import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { locationSlice } from './location-slice';
import { profileSlice } from './profile-slice';

const noNotification = { status: '', title: '', message: '' }; //change this to null?

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: noNotification,
    showIcons: true,
    isMobile: false,
  },
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
    setShowIcons(state, action: PayloadAction<boolean>) {
      state.showIcons = action.payload;
    },
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

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
