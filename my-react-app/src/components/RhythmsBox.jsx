// src/components/RhythmsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
// Import all necessary actions for this component
import {
    toggleButton,
    incrementCompressionCount, // <-- Need this action
    incrementShockCount     // <-- Need this action
    // Import counter resets if needed: resetCompressionCount, resetShockCount, etc.
} from '../redux/rhythmsSlice';

// Import CSS for styling this specific component
import './RhythmsBox.css';

// Define constants for the component
const boxName = 'Rhythms';
const sliceName = boxName.toLowerCase(); // 'rhythms'

// Helper function to format counter values (e.g., 7 -> "07")
const formatCounter = (count) => String(count).padStart(2, '0');

const RhythmsBox = () => {
    // Hook to dispatch actions
    const dispatch = useDispatch();

    // Select the entire state slice for this component
    const rhythmState = useSelector((state) => state[sliceName]);

    // Destructure needed state values, providing default values (0 or {})
    const {
        lastDetectedCount = 0,
        totalDetectedCount = 0,
        compressionCount = 0,
        shockCount = 0,
        ...buttonStates // Collect remaining properties as button states
    } = rhythmState || {}; // Use default empty object if rhythmState is null/undefined

    // Early return and error logging if the state slice is missing
    if (!rhythmState) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="generic-box red-boxd"><h3>{boxName}</h3><div>Error loading component state.</div></div>;
    }

    // Define button labels explicitly for rendering order and clarity
    // These MUST match the keys used in the Redux slice initial state (derived from boxConfig.js)
    const rhythmLabels = ['ASYSTOLE', 'PEA', 'VF', 'VT', 'OTHER'];
    const compressionLabel = 'COMPRESSION';
    const shockLabel = 'SHOCK';

    return (
        // Main container with red border and specific layout class
        <div className="red-boxd rhythms-box-layout">
            {/* Box Title */}
            <h3>{boxName}</h3>

            {/* Row 1: Top Counters (# Last Detected, # Total Detected) */}
            <div className="counter-row">
                <div className="counter-display">
                    <span className="counter-label"># Last Detected</span>
                    <span className="counter-value">{formatCounter(lastDetectedCount)}</span>
                </div>
                <div className="counter-display">
                    <span className="counter-label"># Total Detected</span>
                    <span className="counter-value">{formatCounter(totalDetectedCount)}</span>
                </div>
            </div>

            {/* Row 2: Main Rhythm Buttons (Hard-coded rendering) */}
            <div className="button-row">
                {rhythmLabels.map((label) => (
                    <Button
                        key={label} // Use label as unique key
                        label={label} // Text displayed above the button indicator
                        visualState={buttonStates[label] ?? 'off'} // Get state from Redux, default to 'off'
                        onClick={() => dispatch(toggleButton(label))} // Dispatch standard toggle action
                    />
                ))}
            </div>

            {/* Row 3: Single row for Compression and Shock Button/Counter Pairs */}
            {/* This parent div uses flex-direction: row (via CSS) */}
            <div className="action-counter-row">

                {/* Group 1: Compression Label + Button/Counter */}
                {/* This div uses flex-direction: column (via CSS) */}
                <div className="labeled-action-pair">
                    <span className="action-label">{compressionLabel}</span>
                    {/* This div uses flex-direction: row (via CSS) */}
                    <div className="button-counter-inline">
                        <Button
                            key={compressionLabel}
                            label="" // No text label needed within the button itself
                            visualState={buttonStates[compressionLabel] ?? 'off'} // Get state from Redux
                            onClick={() => {
                                // Dispatch both actions on click
                                dispatch(toggleButton(compressionLabel)); // Toggle visual state
                                dispatch(incrementCompressionCount()); // Increment specific counter
                            }}
                        />
                        <div className="counter-display small"> {/* Counter display */}
                            <span className="counter-value">{formatCounter(compressionCount)}</span>
                        </div>
                    </div>
                </div>
                {/* End of Group 1 */}

                {/* Group 2: Shock Label + Button/Counter */}
                {/* This div uses flex-direction: column (via CSS) */}
                <div className="labeled-action-pair">
                    <span className="action-label">{shockLabel}</span>
                     {/* This div uses flex-direction: row (via CSS) */}
                     <div className="button-counter-inline">
                        <Button
                            key={shockLabel}
                            label="" // No text label needed within the button itself
                            visualState={buttonStates[shockLabel] ?? 'off'} // Get state from Redux
                            onClick={() => {
                                // Dispatch both actions on click
                                dispatch(toggleButton(shockLabel)); // Toggle visual state
                                dispatch(incrementShockCount()); // Increment specific counter
                            }}
                        />
                        <div className="counter-display small"> {/* Counter display */}
                            <span className="counter-value">{formatCounter(shockCount)}</span>
                        </div>
                    </div>
                </div>
                {/* End of Group 2 */}

            </div> {/* End of action-counter-row */}
        </div> // End of rhythms-box-layout
    );
};

export default RhythmsBox;
