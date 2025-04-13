// src/components/ButtonVariant1.jsx
import React from 'react';
import './ButtonVariants.css'; // Import shared styles

// Define default colors within the component
// const DEFAULT_COLOR_1 = '#FF5733'; // Orange
const DEFAULT_COLOR_1 = '#33FF57'; // Orange

const DEFAULT_COLOR_2 = '#33FF57'; // Green

/**
 * ButtonVariant1 Component
 * - Label above main button
 * - Main circular button
 * - Two vertically stacked circular indicators positioned relative to the button's top-left
 *
 * Props:
 * - label: string - Text label above the button
 * - onClick: function - Handler for main button click
 * - indicator1: { isOn: boolean, color?: string } - State for top indicator
 * - indicator2: { isOn: boolean, color?: string } - State for bottom indicator
 */
const ButtonVariant1 = ({
  label,
  onClick,
  indicator1 = { isOn: false }, // Default props
  indicator2 = { isOn: false }
}) => {

  // Determine color: use prop color if provided, otherwise default
  const color1 = indicator1.color || DEFAULT_COLOR_1;
  const color2 = indicator2.color || DEFAULT_COLOR_2;

  return (
    // Main component wrapper - styles adjusted in CSS (removed padding-left)
    <div className="button-variant-wrapper">
      {/* Label */}
      <span className="button-label">{label}</span>

      {/* Container for button and its relative indicators */}
      <div className="button-with-indicators">
        {/* Main Button */}
        <button className="button" onClick={onClick}></button>

        {/* Circular Indicators - Now positioned relative to this container */}
        <span
          className={`circular-indicator indicator-pos-tl1 ${indicator1.isOn ? 'on' : ''}`}
          style={{ '--indicator-color': color1 }} // Use CSS variable for color
          title={`Indicator 1: ${indicator1.isOn ? 'On' : 'Off'}`} // Tooltip
        />
        <span
          className={`circular-indicator indicator-pos-tl2 ${indicator2.isOn ? 'on' : ''}`}
          style={{ '--indicator-color': color2 }}
          title={`Indicator 2: ${indicator2.isOn ? 'On' : 'Off'}`}
        />
      </div>
    </div>
  );
};

export default ButtonVariant1;
