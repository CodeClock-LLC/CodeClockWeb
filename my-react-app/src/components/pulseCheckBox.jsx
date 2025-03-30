// src/components/PulseCheckBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button'; // Assuming your generic Button component
import { boxButtonLabels } from '../config/boxConfig';
import { toggleButton } from '../redux/pulseCheckSlice'; // Import the *specific* action

const boxName = 'PulseCheck';
const labels = boxButtonLabels[boxName];
const sliceName = boxName.toLowerCase(); // 'pulsecheck'

const PulseCheckBox = () => {
    const dispatch = useDispatch();
    // Select state from the specific slice for this box
    const buttonStates = useSelector((state) => state[sliceName]);

    if (!buttonStates) {
        console.error(`State for slice "${sliceName}" not found!`);
        return <div>Error loading {boxName} buttons.</div>;
    }


    return (
        <div className="generic-box red-boxd"> {/* Add some basic styling */}
            <h3>{boxName}</h3>
            <div className="button-row"> {/* Style this row */}
                {labels.map((label) => (
                    <Button
                        key={label}
                        label={label} // Display the placeholder ID for now
                        visualState={buttonStates[label] ?? 'off'}
                        // Dispatch the specific toggle action for this slice
                        onClick={() => dispatch(toggleButton(label))}
                    />
                ))}
            </div>
        </div>
    );
};

export default PulseCheckBox;