// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'EndStates';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const endStatesSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'endStates'
    initialState,
    reducers: {
        // Action name will be like 'endStates/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'endStates-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = endStatesSlice.actions;
export default endStatesSlice.reducer;