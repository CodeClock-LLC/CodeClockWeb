// src/redux/loggingMiddleware.js
import { addLogEntry } from './logSlice';
import { boxNames } from '../config/boxConfig';

// Create a set of the expected action prefixes (lowercase box names)
const boxActionPrefixes = new Set(boxNames.map(name => name.toLowerCase()));

export const loggingMiddleware = store => next => action => {
    // Check if the action type matches the pattern "boxname/toggleButton"
    const actionPrefix = action.type.split('/')[0];
    const isToggleButtonAction = boxActionPrefixes.has(actionPrefix) && action.type.endsWith('/toggleButton');

    if (isToggleButtonAction) {
        const buttonId = action.payload;
        const boxName = actionPrefix; // The prefix is the lowercase box name
        const state = store.getState();

        // Get state *before* the action is processed
        const prevState = state[boxName]?.[buttonId] ?? 'unknown';

        // Let the action proceed to the reducer
        const result = next(action);

        // Get state *after* the action is processed
        const newState = store.getState()[boxName]?.[buttonId] ?? 'unknown';

        // Create the log entry only if state actually changed (or always log toggle attempt)
        if (prevState !== newState) {
             const logEntry = {
                 timestamp: new Date().toISOString(), // Use UTC ISO format
                 box: boxName,
                 buttonId: buttonId,
                 prevState: prevState,
                 newState: newState,
                 actionType: action.type // Include the original action type
             };
             // Dispatch the action to add the entry to the log slice
             store.dispatch(addLogEntry(logEntry));
        }

        return result; // Return the result of next(action)

    } else {
        // If it's not a button toggle action, just pass it through
        return next(action);
    }
};