// src/redux/logSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entries: [], // Array to hold log entry objects
};

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        /**
         * Adds a new log entry to the history.
         * Expects payload: { timestamp: string, box: string, buttonId: string, prevState: string, newState: string }
         */
        addLogEntry: (state, action) => {
            state.entries.push(action.payload);
        },
        /**
         * Clears all log entries.
         */
        clearLog: (state) => {
            state.entries = [];
        },
    },
});

export const { addLogEntry, clearLog } = logSlice.actions;
export default logSlice.reducer;