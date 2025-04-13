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
        indicator1On: false,   // State for ButtonVariant1 indicator 1
        indicator2On: false,   // State for ButtonVariant1 indicator 2
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
                // TODO: Add logic here later to potentially change indicator states
                // based on the mainState transition if needed.
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
        // Additional functionality ::: 
        // --- Actions to specifically control indicators ---
        // Example: Set state for indicator 1
        setIndicator1State: (state, action) => {
            const { label, isOn } = action.payload; // Expect { label: string, isOn: boolean }
            if (state[label]) {
                state[label].indicator1On = !!isOn; // Ensure boolean
            }
        },
        // Example: Set state for indicator 2
        setIndicator2State: (state, action) => {
            const { label, isOn } = action.payload; // Expect { label: string, isOn: boolean }
             if (state[label]) {
                state[label].indicator2On = !!isOn; // Ensure boolean
            }
        },
        // Example: Toggle state for indicator 1
        toggleIndicator1: (state, action) => {
             const label = action.payload; // Expect label string
             if (state[label]) {
                state[label].indicator1On = !state[label].indicator1On;
            }
        },
         // Example: Toggle state for indicator 2
        toggleIndicator2: (state, action) => {
             const label = action.payload; // Expect label string
             if (state[label]) {
                state[label].indicator2On = !state[label].indicator2On;
            }
        }
    },
});

// Export all actions
export const {
    toggleButton,
    resetButtons,
    setIndicator1State,
    setIndicator2State,
    toggleIndicator1,
    toggleIndicator2
} = medsSlice.actions;

export default medsSlice.reducer;
