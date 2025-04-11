// src/components/RhythmsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { boxButtonLabels } from '../config/boxConfig';
// Import necessary actions (only toggleButton needed for now based on request)
import { toggleButton } from '../redux/rhythmsSlice';
// Import counter actions if buttons here need to trigger them directly
// import { incrementLastDetected, incrementTotalDetected, resetAllCounters } from '../redux/rhythmsSlice';

import './RhythmsBox.css'; // Import CSS for styling

const boxName = 'Rhythms';
const labels = boxButtonLabels[boxName] || []; // Ensure labels is an array
const sliceName = boxName.toLowerCase(); // 'rhythms'

// Helper to format counter as two digits
const formatCounter = (count) => String(count).padStart(2, '0');

const RhythmsBox = () => {
    const dispatch = useDispatch();

    // Select button states AND counter states from the slice
    // Using a single selector is often more efficient
    const { lastDetectedCount, totalDetectedCount, ...buttonStates } = useSelector(
        (state) => state[sliceName] || {} // Provide default empty object if slice state is missing
    );

    // Check if the slice state itself is missing (more robust check)
    const sliceStateExists = useSelector((state) => !!state[sliceName]);
    if (!sliceStateExists) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="generic-box red-boxd"><h3>{boxName}</h3><div>Error loading component state.</div></div>;
    }

    // Example handler if a button needed to increment counters
    // const handleButtonClick = (label) => {
    //     dispatch(toggleButton(label));
    //     // Example: Increment counters when a specific button is toggled ON
    //     if (buttonStates[label] === 'off') { // Check *current* state before toggle
    //        if (label === 'Rhythms-1' || label === 'Rhythms-2') { // Example condition
    //           dispatch(incrementLastDetected());
    //           dispatch(incrementTotalDetected());
    //        }
    //     }
    // }

    return (
        <div className="red-boxd rhythms-box-layout"> {/* Added specific class */}
            <h3>{boxName}</h3>

            {/* Counter Row */}
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

            {/* Button Row */}
            <div className="button-row">
                {labels.map((label) => (
                    <Button
                        key={label}
                        label={label} // Display the placeholder ID
                        visualState={buttonStates[label] ?? 'off'}
                        // onClick={() => handleButtonClick(label)} // Use specific handler if needed
                        onClick={() => dispatch(toggleButton(label))} // Default toggle action
                    />
                ))}
            </div>
        </div>
    );
};

export default RhythmsBox;