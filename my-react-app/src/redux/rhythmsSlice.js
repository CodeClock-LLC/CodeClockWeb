// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Rhythms';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const rhythmsSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'rhythms'
    initialState,
    reducers: {
        // Action name will be like 'rhythms/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'Rhythms-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = rhythmsSlice.actions;
export default rhythmsSlice.reducer;