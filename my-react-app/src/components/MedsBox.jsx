// src/components/MedsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import ButtonVariant1 from './ButtonVariant1'; // Import the new button variant
import { boxButtonLabels } from '../config/boxConfig';
// *** IMPORTANT: Make sure you have created src/redux/medsSlice.js ***
import { toggleButton } from '../redux/medsSlice'; // Import the specific action

const boxName = 'Meds';
// Get all labels for this box, default to empty array if not found
const allLabels = boxButtonLabels[boxName] || [];
const sliceName = boxName.toLowerCase(); // 'meds'

// Split labels into two groups
const topRowLabels = allLabels.slice(0, 3); // First 3 labels
const bottomRowLabels = allLabels.slice(3); // The rest of the labels

const MedsBox = () => {
    const dispatch = useDispatch();
    // Select the state for this slice
    const buttonStates = useSelector((state) => state[sliceName]);

    // Handle case where slice state might not be ready/configured
    if (!buttonStates) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="red-boxd"><h3>{boxName}</h3><div>Error loading buttons.</div></div>;
    }

    return (
        // Main container with red border
        <div className="red-boxd">
            {/* Box Title */}
            <h3>{boxName}</h3>

            {/* Top Row - First 3 Buttons */}
            <div className="button-row" style={{ marginBottom: '10px' }}> {/* Added margin below top row */}
                {topRowLabels.map((label) => (
                    <Button
                        key={label} // Use label as unique key
                        label={label} // Display the actual medication/action name
                        visualState={buttonStates[label] ?? 'off'} // Get state from Redux
                        onClick={() => dispatch(toggleButton(label))} // Dispatch toggle action
                    />
                ))}
            </div>

            {/* --- Div for Text Display Added Here --- */}
            <div className="meds-info-box red-border"> {/* Changed class name */}
                {/* Placeholder text - replace with dynamic content later if needed */}
                TODO: Add Notes on Bolus and Drip Indicators
            </div>
            {/* --- End Text Display Div --- */}

            {/* Bottom Row - Remaining Buttons */}
            <div className="button-row">
                {bottomRowLabels.map((label) => {
                        // Get the state object for this button, default if not found
                        const stateObj = buttonStates[label] || { mainState: 'off', indicator1On: false, indicator2On: false };
                        return (
                            <ButtonVariant1
                                key={label}
                                label={label} // Label above the button
                                // The main button click still toggles the main visual state (off/solid/flashing)
                                onClick={() => dispatch(toggleButton(label))}
                                // Pass indicator states from the Redux state object
                                // The 'isOn' property controls the indicator's brightness/visibility
                                indicator1={{ isOn: stateObj.indicator1On ?? false }}
                                indicator2={{ isOn: stateObj.indicator2On ?? false }}
                                // Note: Colors are using the defaults defined within ButtonVariant1.jsx
                                // You could pass 'color: "your_color"' in the objects above to override.
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default MedsBox;
