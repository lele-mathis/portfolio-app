import { createSlice, configureStore } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { locations: [] },
  reducers: {
    addLocation(state, action) {
      //add location to array
    },
    removeLocation(state, action) {
      //remove location from array
    },
  },
});

const store = configureStore({
  reducer: { weather: weatherSlice.reducer },
});

export default store;
