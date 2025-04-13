// src/components/MedsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button'; // Original button for top row
import ButtonVariant1 from './ButtonVariant1'; // Variant for bottom row
import { boxButtonLabels } from '../config/boxConfig';
// Import the actions needed from the updated slice
import {
    toggleButton,
    cycleIndicators // Use cycleIndicators for the 3-state logic
    // Add other indicator actions if needed: , setIndicator1State, etc.
} from '../redux/medsSlice';

// Import CSS if needed (assuming styles are handled globally or imported elsewhere)
// import './MedsBox.css'; // Or './ButtonVariants.css' if styles are there

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

            {/* Top Row - First 3 Buttons (Using Original Button) */}
            <div className="button-row" style={{ marginBottom: '10px' }}>
                {topRowLabels.map((label) => {
                    // Get the state object for this button, provide default if missing
                    const stateObj = buttonStateObjects[label] || { mainState: 'off' };
                    return (
                        <Button
                            key={label}
                            label={label}
                            // Pass the mainState string ('off', 'solid', 'flashing')
                            // to the original Button's visualState prop.
                            visualState={stateObj.mainState}
                            onClick={() => dispatch(toggleButton(label))} // Toggles mainState in Redux
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
                            // onClick now dispatches toggleButton and cycleIndicators
                            onClick={() => {
                                dispatch(toggleButton(label)); // Toggle main button state
                                dispatch(cycleIndicators(label)); // Cycle through indicator states
                            }}
                            // Pass indicator states from the Redux state object
                            indicator1={{ isOn: stateObj.indicator1On ?? false }}
                            indicator2={{ isOn: stateObj.indicator2On ?? false }}
                            // Colors use defaults from ButtonVariant1.jsx
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MedsBox;
