// src/redux/pulseCheckSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'PulseCheck';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const pulseCheckSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'pulsecheck'
    initialState,
    reducers: {
        // Action name will be like 'pulsecheck/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'PulseCheck-3'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = pulseCheckSlice.actions;
export default pulseCheckSlice.reducer;