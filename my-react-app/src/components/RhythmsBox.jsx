// src/components/RhythmsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { boxButtonLabels } from '../config/boxConfig';
// *** IMPORTANT: Make sure you have created src/redux/rhythmsSlice.js ***
import { toggleButton } from '../redux/rhythmsSlice'; // Import the specific action

const boxName = 'Rhythms';
const labels = boxButtonLabels[boxName] || []; // Ensure labels is an array
const sliceName = boxName.toLowerCase(); // 'rhythms'

const RhythmsBox = () => {
    const dispatch = useDispatch();
    // Select state from the specific slice for this box
    const buttonStates = useSelector((state) => state[sliceName]);

    if (!buttonStates) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="generic-box red-boxd"><h3>{boxName}</h3><div>Error loading buttons.</div></div>;
    }

    return (
        <div className="generic-box red-boxd">
            <h3>{boxName}</h3>
            <div className="counter-row" style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '1rem' }}>
                <div className="counter">
                    Counter 1
                </div>
                <div className="counter">
                    Counter 2
                </div>
            </div>
            <div className="button-row">
                {labels.map((label) => (
                    <Button
                        key={label}
                        label={label} // Display the placeholder ID
                        visualState={buttonStates[label] ?? 'off'}
                        onClick={() => dispatch(toggleButton(label))}
                    />
                ))}
            </div>
        </div>
    );
};

export default RhythmsBox;