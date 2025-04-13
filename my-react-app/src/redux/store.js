// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import { loggingMiddleware } from './loggingMiddleware';

// // Import ALL slice reducers
// import pulseCheckReducer from './pulseCheckSlice'; // Ensure path is correct
// import rhythmsReducer from './rhythmsSlice';
// import medsReducer from './medsSlice';
// import tasksReducer from './tasksSlice';
// import rolesReducer from './rolesSlice';
// // import meds2Reducer from './meds2Slice'; // Still commented if not used
// import viewsReducer from './viewsSlice';
// import endStatesReducer from './endStatesSlice';
// import logReducer from './logSlice';
// import mainTimerReducer from './mainTimerSlice'; // <-- Import the new slice reducer

// const middleware = [loggingMiddleware];

// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(logger);
// }

// export const store = configureStore({
//   reducer: {
//     // Box reducers
//     pulsecheck: pulseCheckReducer,
//     rhythms: rhythmsReducer,
//     meds: medsReducer,
//     tasks: tasksReducer,
//     roles: rolesReducer,
//     // meds2: meds2Reducer,
//     views: viewsReducer,
//     endstates: endStatesReducer,
//     // Other reducers
//     log: logReducer,
//     mainTimer: mainTimerReducer, // <-- Add the main timer reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(middleware),
// });

// export default store;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
// Import the logger factory function directly to allow configuration
// import createLogger from 'redux-logger';
import { createLogger } from 'redux-logger'
import { loggingMiddleware } from './loggingMiddleware'; // Custom middleware for persistent log

// Import ALL slice reducers
import pulseCheckReducer, { tickPulseCheckTimer } from './pulseCheckSlice'; // Import tick action
import rhythmsReducer from './rhythmsSlice';
import medsReducer from './medsSlice';
import tasksReducer from './tasksSlice';
import rolesReducer from './rolesSlice';
// import meds2Reducer from './meds2Slice'; // Keep commented if not used
import viewsReducer from './viewsSlice';
import endStatesReducer from './endStatesSlice';
import logReducer from './logSlice';
import mainTimerReducer, { tickTotalTimer } from './mainTimerSlice'; // Import tick action

// --- Configure redux-logger ---
// Define a predicate function: returns true if the action should be logged
const loggerPredicate = (getState, action) => {
    // Return false (don't log) if the action type matches either tick action
    return action.type !== tickTotalTimer.type &&
           action.type !== tickPulseCheckTimer.type;
};

// Create the logger instance using createLogger, passing the predicate
const logger = createLogger({
  predicate: loggerPredicate,
  collapsed: true, // Optional: keep logs collapsed
  // Add other logger options if desired
});
// --- End logger configuration ---

// Define middleware array, starting with your custom one
const middleware = [loggingMiddleware];

// Add the configured logger only in development mode
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger); // Add the configured logger instance
}

// Configure the store
export const store = configureStore({
  reducer: {
    // Add all reducers
    pulsecheck: pulseCheckReducer,
    rhythms: rhythmsReducer,
    meds: medsReducer,
    tasks: tasksReducer,
    roles: rolesReducer,
    // meds2: meds2Reducer,
    views: viewsReducer,
    endstates: endStatesReducer,
    log: logReducer,
    mainTimer: mainTimerReducer,
  },
  // Apply all middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        // Consider disabling serializableCheck if logger causes issues,
        // but usually fine for development.
        // serializableCheck: false,
    }).concat(middleware),
});

export default store;
