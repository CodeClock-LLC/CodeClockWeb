// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Rhythms';
// Get labels, defaulting to empty array if not found in config
const labels = boxButtonLabels[boxName] || [];

// Initialize state for buttons based on labels found
const initialButtonState = Array.isArray(labels) ? labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {}) : {};

// Define the complete initial state, including ALL counters
const initialState = {
    ...initialButtonState,      // Button states
    lastDetectedCount: 0,       // Counter 1
    totalDetectedCount: 0,      // Counter 2
    compressionCount: 0,        // <-- Initialize Compression Counter
    shockCount: 0,              // <-- Initialize Shock Counter
};

// Log error only if labels weren't found (initialState itself will be valid)
if (!Array.isArray(labels) || labels.length === 0) {
    console.error(`[rhythmsSlice] Could not find or generate labels for boxName: ${boxName}. Check boxConfig.js.`);
}

export const rhythmsSlice = createSlice({
    name: boxName.toLowerCase(), // 'rhythms'
    initialState, // Use the complete initial state
    reducers: {
        // --- Button Reducers ---
        toggleButton: (state, action) => {
            const label = action.payload;
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            } else {
                console.warn(`[rhythmsSlice] Button label not found in state:`, label);
            }
        },
        resetButtons: (state) => {
             const currentLabels = boxButtonLabels[boxName] || [];
             if (Array.isArray(currentLabels)) {
                 currentLabels.forEach(label => {
                     // Ensure the property exists before trying to reset it
                     // This check is important because initialState might not have
                     // all keys if labels array was empty initially.
                     if (state.hasOwnProperty(label)) {
                       state[label] = 'off';
                     }
                 });
             }
             // Note: This only resets buttons added during initialization based on config
             // It does not affect the counter properties
        },

        // --- Counter Reducers ---
        incrementLastDetected: (state) => {
            // Ensure state exists before incrementing
            state.lastDetectedCount = ((state.lastDetectedCount || 0) + 1) % 100;
        },
        resetLastDetected: (state) => {
            state.lastDetectedCount = 0;
        },
        incrementTotalDetected: (state) => {
            state.totalDetectedCount = ((state.totalDetectedCount || 0) + 1) % 100;
        },
        resetTotalDetected: (state) => {
            state.totalDetectedCount = 0;
        },
        incrementCompressionCount: (state) => {
            // Use || 0 to handle potential undefined state if initialization failed, though less likely now
            state.compressionCount = ((state.compressionCount || 0) + 1) % 100;
        },
        resetCompressionCount: (state) => {
            state.compressionCount = 0;
        },
        incrementShockCount: (state) => {
            state.shockCount = ((state.shockCount || 0) + 1) % 100;
        },
        resetShockCount: (state) => {
            state.shockCount = 0;
        },
        resetAllCounters: (state) => {
            state.lastDetectedCount = 0;
            state.totalDetectedCount = 0;
            state.compressionCount = 0;
            state.shockCount = 0;
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
    resetAllCounters,
    incrementCompressionCount,
    resetCompressionCount,
    incrementShockCount,
    resetShockCount
} = rhythmsSlice.actions;

export default rhythmsSlice.reducer;
