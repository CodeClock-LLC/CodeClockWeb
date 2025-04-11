// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { loggingMiddleware } from './loggingMiddleware';

// Import ALL slice reducers
import pulseCheckReducer from './pulseCheckSlice'; // Ensure path is correct
import rhythmsReducer from './rhythmsSlice';
import medsReducer from './medsSlice';
import tasksReducer from './tasksSlice';
import rolesReducer from './rolesSlice';
// import meds2Reducer from './meds2Slice'; // Still commented if not used
import viewsReducer from './viewsSlice';
import endStatesReducer from './endStatesSlice';
import logReducer from './logSlice';
import mainTimerReducer from './mainTimerSlice'; // <-- Import the new slice reducer

const middleware = [loggingMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    // Box reducers
    pulsecheck: pulseCheckReducer,
    rhythms: rhythmsReducer,
    meds: medsReducer,
    tasks: tasksReducer,
    roles: rolesReducer,
    // meds2: meds2Reducer,
    views: viewsReducer,
    endstates: endStatesReducer,
    // Other reducers
    log: logReducer,
    mainTimer: mainTimerReducer, // <-- Add the main timer reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
