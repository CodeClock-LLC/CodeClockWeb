// src/redux/meds2Slice.js
import { createSlice } from '@reduxjs/toolkit';
import { getNextButtonState } from './buttonStateHelper';
import { boxButtonLabels } from '../config/boxConfig';

const boxName = 'Meds2';
const labels = boxButtonLabels[boxName];

const initialState = labels.reduce((acc, label) => {
    acc[label] = 'off';
    return acc;
}, {});

export const medsSlice = createSlice({
    name: boxName.toLowerCase(), // e.g., 'meds'
    initialState,
    reducers: {
        // Action name will be like 'meds/toggleButton'
        toggleButton: (state, action) => {
            const label = action.payload; // Expects button label like 'meds-1'
            if (state.hasOwnProperty(label)) {
                state[label] = getNextButtonState(state[label]);
            }
        },
        resetButtons: () => initialState,
    },
});

export const { toggleButton, resetButtons } = medsSlice.actions;
export default medsSlice.reducer;