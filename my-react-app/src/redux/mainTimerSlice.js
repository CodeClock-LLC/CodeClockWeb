// src/redux/mainTimerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalSeconds: 0,
  isRunning: true, // Assume it starts running immediately
};

export const mainTimerSlice = createSlice({
  name: 'mainTimer',
  initialState,
  reducers: {
    tickTotalTimer: (state) => {
      if (state.isRunning) {
        state.totalSeconds += 1;
      }
    },
    stopTotalTimer: (state) => {
      state.isRunning = false;
    },
    startTotalTimer: (state) => {
      state.isRunning = true;
    },
    resetTotalTimer: (state) => {
      state.totalSeconds = 0;
      state.isRunning = false; // Or true depending on desired reset behavior
    },
  },
});

export const {
  tickTotalTimer,
  stopTotalTimer,
  startTotalTimer,
  resetTotalTimer,
} = mainTimerSlice.actions;

export default mainTimerSlice.reducer;
