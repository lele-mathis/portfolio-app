import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const noNotification = { status: '', title: '', message: '' };

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: noNotification,
    showIcons: true,
    isNarrow: false,
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
    setIsNarrow(state, action: PayloadAction<boolean>) {
      state.isNarrow = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
