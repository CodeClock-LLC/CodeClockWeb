// src/redux/pulseCheckSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper'; // Keep helper

// Define the single button ID for this box
const PULSE_CHECK_BUTTON_ID = 'PulseCheck-Btn'; // Use a descriptive ID

const initialState = {
  // State for the single button
  buttonState: 'off', // 'off', 'solid', 'flashing'
  // State for the countdown timer
  pulseCheckTimerSeconds: 120, // 2 minutes
  isPulseCheckTimerRunning: false,
};

export const pulseCheckSlice = createSlice({
  name: 'pulsecheck', // Keep slice name consistent
  initialState,
  reducers: {
    // Action for the specific button
    togglePulseCheckButton: (state) => {
      state.buttonState = getNextButtonState(state.buttonState);
      // Optional: Reset timer or stop flashing when manually toggled?
      // if (state.buttonState === 'off') {
      //    state.pulseCheckTimerSeconds = 120;
      // }
    },
    setPulseCheckButtonState: (state, action) => {
       // Payload should be 'off', 'solid', or 'flashing'
       if (['off', 'solid', 'flashing'].includes(action.payload)) {
           state.buttonState = action.payload;
       }
    },
    // Actions for the timer
    tickPulseCheckTimer: (state) => {
       if (state.isPulseCheckTimerRunning && state.pulseCheckTimerSeconds > 0) {
           state.pulseCheckTimerSeconds -= 1;
       }
    },
    togglePulseCheckTimerRunning: (state) => {
        // Only start if timer > 0 or toggle off if running
        if (!state.isPulseCheckTimerRunning && state.pulseCheckTimerSeconds > 0) {
             state.isPulseCheckTimerRunning = true;
        } else if (state.isPulseCheckTimerRunning) {
             state.isPulseCheckTimerRunning = false;
        }
         // If trying to start at 0, reset first (optional behavior)
        // else if (!state.isPulseCheckTimerRunning && state.pulseCheckTimerSeconds <= 0) {
        //     state.pulseCheckTimerSeconds = 120;
        //     state.isPulseCheckTimerRunning = true;
        // }
    },
    resetPulseCheckTimer: (state, action) => {
        state.pulseCheckTimerSeconds = action?.payload ?? 120; // Reset to payload or 120
        state.isPulseCheckTimerRunning = false; // Stop timer on reset
        // Also reset button state?
        // state.buttonState = 'off';
    },
    stopPulseCheckTimer: (state) => {
        state.isPulseCheckTimerRunning = false;
    }
  },
});

// Export actions
export const {
    togglePulseCheckButton,
    setPulseCheckButtonState,
    tickPulseCheckTimer,
    togglePulseCheckTimerRunning,
    resetPulseCheckTimer,
    stopPulseCheckTimer
} = pulseCheckSlice.actions;

// Export the button ID for use in the component
export { PULSE_CHECK_BUTTON_ID };

export default pulseCheckSlice.reducer;