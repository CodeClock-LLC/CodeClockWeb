// src/redux/rhythmsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Meds';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const rolesSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'roles'
    initialState,
    reducers: {
        // Action name will be like 'meds/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'Rhythms-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = rolesSlice.actions;
export default rolesSlice.reducer;