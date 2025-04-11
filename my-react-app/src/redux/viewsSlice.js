// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Views';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const viewsSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'views'
    initialState,
    reducers: {
        // Action name will be like 'views/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'views-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = viewsSlice.actions;
export default viewsSlice.reducer;