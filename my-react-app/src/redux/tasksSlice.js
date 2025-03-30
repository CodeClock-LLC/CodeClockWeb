// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Tasks';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const tasksSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'tasks'
    initialState,
    reducers: {
        // Action name will be like 'tasks/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'tasks-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = tasksSlice.actions;
export default tasksSlice.reducer;