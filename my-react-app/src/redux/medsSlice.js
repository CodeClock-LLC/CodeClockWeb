// src/redux/medsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Meds';
const labels = boxButtonLabels[boxName] || []; // Use || [] as fallback

// Initialize state with nested object for each button
const initialState = Array.isArray(labels) ? labels.reduce((acc, label) => {
    // Each button now has an object storing its states
    acc[label] = {
        mainState: 'off',      // 'off', 'solid', 'flashing'
        indicator1On: false,   // State for ButtonVariant1 indicator 1 (Top)
        indicator2On: false,   // State for ButtonVariant1 indicator 2 (Bottom)
    };
    return acc;
}, {}) : {};

if (!Array.isArray(labels) || labels.length === 0) {
    console.error(`[medsSlice] Could not find or generate labels for boxName: ${boxName}. Check boxConfig.js.`);
}

export const medsSlice = createSlice({
    name: boxName.toLowerCase(), // 'meds'
    initialState,
    reducers: {
        // Toggle the main state of a button
        toggleButton: (state, action) => {
            const label = action.payload;
            if (state[label]) { // Check if button state object exists
                state[label].mainState = getNextButtonState(state[label].mainState);
            } else {
                console.warn(`[medsSlice] Button label not found in state:`, label);
            }
        },
        // Reset all buttons in this slice
        resetButtons: (state) => {
             const currentLabels = boxButtonLabels[boxName] || [];
             if (Array.isArray(currentLabels)) {
                 currentLabels.forEach(label => {
                     if (state[label]) { // Check if property exists
                       state[label].mainState = 'off';
                       state[label].indicator1On = false;
                       state[label].indicator2On = false;
                     }
                 });
             }
        },

        // --- NEW Reducer for 3-state indicator cycle ---
        cycleIndicators: (state, action) => {
            const label = action.payload;
            if (state[label]) {
                const indicator1 = state[label].indicator1On;
                const indicator2 = state[label].indicator2On;

                if (!indicator1 && !indicator2) {
                    // State 0 (Both Off) -> State 1 (Top On)
                    state[label].indicator1On = true;
                    state[label].indicator2On = false;
                } else if (indicator1 && !indicator2) {
                    // State 1 (Top On) -> State 2 (Both On)
                    state[label].indicator1On = true;
                    state[label].indicator2On = true;
                } else {
                    // State 2 (Both On) -> State 0 (Both Off)
                    // Also handles any unexpected state by resetting
                    state[label].indicator1On = false;
                    state[label].indicator2On = false;
                }
            } else {
                 console.warn(`[medsSlice] Button label not found in state for cycleIndicators:`, label);
            }
        },
        // --- End New Reducer ---

        // --- Existing actions to specifically control indicators (optional) ---
        setIndicator1State: (state, action) => {
            const { label, isOn } = action.payload;
            if (state[label]) { state[label].indicator1On = !!isOn; }
        },
        setIndicator2State: (state, action) => {
            const { label, isOn } = action.payload;
             if (state[label]) { state[label].indicator2On = !!isOn; }
        },
        toggleIndicator1: (state, action) => {
             const label = action.payload;
             if (state[label]) { state[label].indicator1On = !state[label].indicator1On; }
        },
        toggleIndicator2: (state, action) => {
             const label = action.payload;
             if (state[label]) { state[label].indicator2On = !state[label].indicator2On; }
        }
    },
});

// Export all actions, including the new one
export const {
    toggleButton,
    resetButtons,
    cycleIndicators, // <-- Export new action
    setIndicator1State,
    setIndicator2State,
    toggleIndicator1,
    toggleIndicator2
} = medsSlice.actions;

export default medsSlice.reducer;
