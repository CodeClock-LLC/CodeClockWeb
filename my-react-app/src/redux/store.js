// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // For dev console logs
import { loggingMiddleware } from './loggingMiddleware'; // Custom middleware for persistent log

// Import ALL your slice reducers
import pulseCheckReducer from './pulseCheckSlice';
import rhythmsReducer from './rhythmsSlice';
import medsReducer from './medsSlice'; // Assuming you created these
import tasksReducer from './tasksSlice';
import rolesReducer from './rolesSlice';
// import meds2Reducer from './meds2Slice';
import viewsReducer from './viewsSlice';
import endStatesReducer from './endStatesSlice';
import logReducer from './logSlice'; // The central log store


const middleware = [loggingMiddleware]; // Start with our custom middleware

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger); // Add redux-logger in development
}

export const store = configureStore({
  reducer: {
    // Add all box reducers (use lowercase keys matching slice names)
    pulsecheck: pulseCheckReducer,
    rhythms: rhythmsReducer,
    meds: medsReducer,
    tasks: tasksReducer,
    roles: rolesReducer,
    meds2: meds2Reducer,
    views: viewsReducer,
    endstates: endStatesReducer,
    // Add the log reducer
    log: logReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware), // Apply middleware
});

export default store;