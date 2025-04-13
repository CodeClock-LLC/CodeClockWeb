// src/components/ViewsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { boxButtonLabels } from '../config/boxConfig';
// *** IMPORTANT: Make sure you have created src/redux/viewsSlice.js ***
import { toggleButton } from '../redux/viewsSlice'; // Import the specific action

// Import CSS if creating a specific file, otherwise ensure styles are in App.css
import './ViewsBox.css';

const boxName = 'Views';
const labels = boxButtonLabels[boxName] || [];
const sliceName = boxName.toLowerCase(); // 'views'

const ViewsBox = () => {
    const dispatch = useDispatch();
    const buttonStates = useSelector((state) => state[sliceName]);

    if (!buttonStates) {
        console.error(`State for slice "${sliceName}" not found! Ensure the slice and reducer are configured.`);
        return <div className="red-boxd"><h3>{boxName}</h3><div>Error loading buttons.</div></div>;
    }

    return (
        // Add a container div for relative positioning context
        <div className="red-boxd views-box-container"> {/* Added views-box-container class */}
            {/* Existing Content */}
            <h3>{boxName}</h3>
            <div className="button-row">
                {labels.map((label) => (
                    <Button
                        key={label}
                        label={label}
                        visualState={buttonStates[label] ?? 'off'}
                        onClick={() => dispatch(toggleButton(label))}
                    />
                ))}
            </div>

            {/* --- Overlay Div --- */}
            <div className="construction-overlay">
                <p>🚧 Under Construction 🚧</p>
                <p>(Views Box functionality is not yet implemented)</p>
            </div>
            {/* --- End Overlay Div --- */}
        </div>
    );
};

export default ViewsBox;
