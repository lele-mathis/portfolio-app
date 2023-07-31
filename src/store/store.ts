import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { locationSlice } from './location-slice';

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

const initUsernamesList: string[] = [];

export const profileSlice = createSlice({
  name: 'profile',
  initialState: { username: '', usernamesList: initUsernamesList },
  reducers: {
    logIn(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    logOut(state) {
      state.username = '';
    },
    addProfile(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.usernamesList.push(action.payload);
      console.log(
        'Added user ' + action.payload + ' to usersList: ' + state.usernamesList
      );
    },
  },
});

export const profileActions = profileSlice.actions;

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
