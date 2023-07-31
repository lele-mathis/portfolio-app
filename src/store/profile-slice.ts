import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

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
    setUsersList(state, action: PayloadAction<string[]>) {
      state.usernamesList = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
