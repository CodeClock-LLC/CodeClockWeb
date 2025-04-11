// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Rhythms';
const labels = boxButtonLabels[boxName] || []; // Use || [] as fallback

// Initialize state for buttons AND counters
const initialButtonState = Array.isArray(labels) ? labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {}) : {};

const initialState = {
    ...initialButtonState, // Spread the button states
    lastDetectedCount: 0,  // Counter 1: # Last Detected
    totalDetectedCount: 0, // Counter 2: # Total Detected
};

// Log error if labels weren't found during initialization
if (!Array.isArray(labels) || labels.length === 0) {
    console.error(`[rhythmsSlice] Could not find or generate labels for boxName: ${boxName}. Check boxConfig.js.`);
}

export const rhythmsSlice = createSlice({
    name: boxName.toLowerCase(), // 'rhythms'
    initialState,
    reducers: {
        // --- Button Reducers ---
        toggleButton: (state, action) => {
            const label = action.payload;
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
                // TODO: Potentially dispatch counter increments here based on label/state?
                // Example: if (label === 'Rhythms-1' && state[label] === 'solid') { /* increment logic */ }
            } else {
                console.warn(`[rhythmsSlice] Button label not found in state:`, label);
            }
        },
        resetButtons: (state) => {
            // Reset only button states, keep counters unless specified otherwise
             const currentLabels = boxButtonLabels[boxName] || [];
             if (Array.isArray(currentLabels)) {
                 currentLabels.forEach(label => {
                     if (state.hasOwnProperty(label)) { // Check if property exists before setting
                       state[label] = 'off';
                     }
                 });
             }
             // Or reset the whole slice state if needed: return initialState;
        },

        // --- Counter Reducers ---
        incrementLastDetected: (state) => {
            state.lastDetectedCount = (state.lastDetectedCount + 1) % 100; // Ensure it stays 0-99
        },
        resetLastDetected: (state) => {
            state.lastDetectedCount = 0;
        },
        incrementTotalDetected: (state) => {
            state.totalDetectedCount = (state.totalDetectedCount + 1) % 100; // Ensure it stays 0-99
        },
        resetTotalDetected: (state) => {
            state.totalDetectedCount = 0;
        },
        // Optional: Reset both counters at once
        resetAllCounters: (state) => {
            state.lastDetectedCount = 0;
            state.totalDetectedCount = 0;
        }
    },
});

// Export all actions
export const {
    toggleButton,
    resetButtons,
    incrementLastDetected,
    resetLastDetected,
    incrementTotalDetected,
    resetTotalDetected,
    resetAllCounters
} = rhythmsSlice.actions;

export default rhythmsSlice.reducer;
