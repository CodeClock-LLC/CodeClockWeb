// src/components/EndStatesBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { boxButtonLabels } from '../config/boxConfig';
// *** IMPORTANT: Make sure you have created src/redux/endStatesSlice.js ***
import { toggleButton } from '../redux/endStatesSlice'; // Import the specific action
import './EndStatesBox.css';

const boxName = 'EndStates';
const labels = boxButtonLabels[boxName] || [];
const sliceName = boxName.toLowerCase(); // 'endstates'

const EndStatesBox = () => {
    const dispatch = useDispatch();
    const buttonStates = useSelector((state) => state[sliceName]);

    if (!buttonStates) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="red-boxd"><h3>{boxName}</h3><div>Error loading buttons.</div></div>;
    }

    return (
        // Main container
        <div className="red-boxd">
            <h3>{boxName}</h3>
            {/* Apply both general button-row styles and specific endstates styles */}
            <div className="endstates-button-row"> {/* Added endstates-button-row class */}
                {labels.map((label) => (
                    <Button
                        key={label}
                        label={label}
                        visualState={buttonStates[label] ?? 'off'}
                        onClick={() => dispatch(toggleButton(label))}
                    />
                ))}
            </div>
        </div>
    );
};

export default EndStatesBox;
