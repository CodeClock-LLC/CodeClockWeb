// src/components/MedsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Remove original Button import if no longer used elsewhere in this file
// import Button from './Button';
import ButtonVariant1 from './ButtonVariant1'; // Variant for bottom row
import ButtonVariant4 from './ButtonVariant4'; // <-- Import ButtonVariant4
import { boxButtonLabels } from '../config/boxConfig';
// Import the actions needed from the meds slice
import {
    toggleButton,     // For main state (rect indicator in V4, main button in V1)
    cycleIndicators // For circular indicators in V1 and V4
} from '../redux/medsSlice';

// Import CSS if needed
// import './MedsBox.css'; // Or ButtonVariants.css if styles are shared

const boxName = 'Meds';
// Get all labels for this box, default to empty array if not found
const allLabels = boxButtonLabels[boxName] || [];
const sliceName = boxName.toLowerCase(); // 'meds'

// Split labels into two groups
const topRowLabels = allLabels.slice(0, 3); // First 3 labels
const bottomRowLabels = allLabels.slice(3); // The rest of the labels

const MedsBox = () => {
    const dispatch = useDispatch();
    // Select the state for this slice (contains objects per label)
    const buttonStateObjects = useSelector((state) => state[sliceName]);

    // Handle case where slice state might not be ready/configured
    if (!buttonStateObjects) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="red-boxd"><h3>{boxName}</h3><div>Error loading buttons.</div></div>;
    }

    return (
        // Main container with red border
        <div className="red-boxd">
            {/* Box Title */}
            <h3>{boxName}</h3>

            {/* Top Row - First 3 Buttons (Now Using ButtonVariant4) */}
            <div className="button-row" style={{ marginBottom: '10px' }}>
                {topRowLabels.map((label) => {
                    // Get the state object for this button, provide default if missing
                    const stateObj = buttonStateObjects[label] || { mainState: 'off', indicator1On: false, indicator2On: false };
                    return (
                        <ButtonVariant4 // <-- Use ButtonVariant4 here
                            key={label}
                            label={label}
                            // Pass the mainState for the rectangular indicator
                            visualState={stateObj.mainState}
                            // Pass the states for the circular indicators
                            indicator1={{ isOn: stateObj.indicator1On ?? false }}
                            indicator2={{ isOn: stateObj.indicator2On ?? false }}
                            // onClick dispatches actions for BOTH indicator types
                            onClick={() => {
                                dispatch(toggleButton(label));     // Toggles mainState (rect indicator)
                                dispatch(cycleIndicators(label)); // Cycles circular indicators
                            }}
                        />
                    );
                })}
            </div>

            {/* --- Div for Text Display --- */}
            <div className="meds-info-box red-boxd">
                 <span className="info-item">🟢 = Bolus</span>
                 <span className="info-item">🔵 = Drip (Double Press)</span>
            </div>
            {/* --- End Text Display Div --- */}

            {/* Bottom Row - Remaining Buttons (Using ButtonVariant1) */}
            <div className="button-row">
                {bottomRowLabels.map((label) => {
                     // Get the state object for this button, provide default if missing
                    const stateObj = buttonStateObjects[label] || { mainState: 'off', indicator1On: false, indicator2On: false };
                    return (
                        <ButtonVariant1
                            key={label}
                            label={label} // Label above the button
                            // onClick dispatches actions for BOTH indicator types
                            onClick={() => {
                                dispatch(toggleButton(label)); // Toggle main button state
                                dispatch(cycleIndicators(label)); // Cycle through indicator states
                            }}
                            // Pass indicator states from the Redux state object
                            indicator1={{ isOn: stateObj.indicator1On ?? false }}
                            indicator2={{ isOn: stateObj.indicator2On ?? false }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MedsBox;