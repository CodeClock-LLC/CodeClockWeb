// src/components/RhythmsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
// We still use boxConfig to ensure label consistency with the slice state keys
import { RhythmsBoxLabels } from '../config/boxConfig';

// Import all necessary actions
import {
    toggleButton,
    incrementCompressionCount,
    incrementShockCount
    // Import counter resets if needed: resetCompressionCount, resetShockCount, etc.
} from '../redux/rhythmsSlice';

import './RhythmsBox.css'; // Ensure CSS is imported

const boxName = 'Rhythms';
const sliceName = boxName.toLowerCase(); // 'rhythms'

// Helper to format counter as two digits
const formatCounter = (count) => String(count).padStart(2, '0');

const RhythmsBox = () => {
    const dispatch = useDispatch();

    // Select the entire slice state
    const rhythmState = useSelector((state) => state[sliceName]);

    // Destructure needed values, providing defaults
    const {
        lastDetectedCount = 0,
        totalDetectedCount = 0,
        compressionCount = 0,
        shockCount = 0,
        ...buttonStates // Rest are button states keyed by label from boxConfig
    } = rhythmState || {};

    if (!rhythmState) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="generic-box red-boxd"><h3>{boxName}</h3><div>Error loading component state.</div></div>;
    }

    // Define labels explicitly for clarity in this component
    const rhythmLabels = ['ASYSTOLE', 'PEA', 'VF', 'VT', 'OTHER'];
    const compressionLabel = 'Compression';
    const shockLabel = 'Shock';

    return (
        // Apply red-boxd style here
        <div className="red-boxd rhythms-box-layout">
            <h3>{boxName}</h3>

            {/* Row 1: Existing Counters */}
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

            {/* Row 2: Main Rhythm Buttons (Hard-coded) */}
            <div className="button-row">
                {rhythmLabels.map((label) => (
                    <Button
                        key={label}
                        label={label}
                        visualState={buttonStates[label] ?? 'off'}
                        onClick={() => dispatch(toggleButton(label))} // Standard toggle
                    />
                ))}
            </div>

            {/* Row 3: Compression/Shock Button/Counter Pairs (Hard-coded) */}
            <div className="action-counter-row">
                {/* Compression Pair */}
                <div className="action-counter-pair">
                    <span className="action-label">{compressionLabel}</span>
                    <Button
                        key={compressionLabel}
                        label="" // Keep button visually simple
                        visualState={buttonStates[compressionLabel] ?? 'off'}
                        onClick={() => {
                            // Dispatch both actions on click
                            dispatch(toggleButton(compressionLabel));
                            dispatch(incrementCompressionCount());
                        }}
                    />
                    <div className="counter-display small">
                        <span className="counter-value">{formatCounter(compressionCount)}</span>
                    </div>
                </div>

                {/* Shock Pair */}
                <div className="action-counter-pair">
                     <span className="action-label">{shockLabel}</span>
                     <Button
                        key={shockLabel}
                        label="" // Keep button visually simple
                        visualState={buttonStates[shockLabel] ?? 'off'}
                        onClick={() => {
                            // Dispatch both actions on click
                            dispatch(toggleButton(shockLabel));
                            dispatch(incrementShockCount());
                        }}
                    />
                    <div className="counter-display small">
                        <span className="counter-value">{formatCounter(shockCount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RhythmsBox;
