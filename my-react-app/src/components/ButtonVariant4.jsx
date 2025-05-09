// src/components/ButtonVariant4.jsx
import React, { useState, useEffect } from 'react';
import './ButtonVariants.css'; // Import shared styles

// Define default colors for circular indicators
const DEFAULT_COLOR_1 = '#33FF57'; // Green
const DEFAULT_COLOR_2 = '#33FF57'; // Green

/**
 * ButtonVariant4 Component
 * - Label above
 * - Rectangular indicator below label
 * - Main circular button below rectangular indicator
 * - Two vertically stacked circular indicators positioned relative to the button's top-left
 *
 * Props:
 * - label: string
 * - onClick: function
 * - visualState: 'off' | 'solid' | 'flashing' - Controls rectangular indicator
 * - indicator1: { isOn: boolean, color?: string } - State for top circular indicator
 * - indicator2: { isOn: boolean, color?: string } - State for bottom circular indicator
 */
const ButtonVariant4 = ({
  label,
  onClick,
  visualState = 'off', // Prop for rectangular indicator
  indicator1 = { isOn: false },
  indicator2 = { isOn: false }
}) => {
  // State for blinking effect of rectangular indicator
  const [blink, setBlink] = useState(false);

  // Effect to manage blinking for rectangular indicator
  useEffect(() => {
    let blinkInterval;
    if (visualState === 'flashing') {
      setBlink(false);
      blinkInterval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500);
    } else {
      setBlink(false);
    }
    return () => {
      if (blinkInterval) {
        clearInterval(blinkInterval);
      }
    };
  }, [visualState]);

  // Determine style for rectangular indicator
  const getRectIndicatorStyle = () => {
    if (visualState === 'solid') {
      return { backgroundColor: 'green', animation: 'none' };
    } else if (visualState === 'flashing') {
      return {
          backgroundColor: blink ? 'red' : 'grey',
          // animation: 'variant-flash 0.5s infinite alternate' // If keyframes are defined
        };
    } else {
      return { backgroundColor: '#ddd', animation: 'none' }; // Default 'off' color
    }
  };

  // Determine colors for circular indicators
  const color1 = indicator1.color || DEFAULT_COLOR_1;
  const color2 = indicator2.color || DEFAULT_COLOR_2;

  return (
    // Main wrapper still stacks elements vertically
    <div className="button-variant-wrapper">
      {/* Label */}
      <span className="button-label">{label}</span>

      {/* Rectangular Indicator */}
      <div className="rect-indicator" style={getRectIndicatorStyle()}></div>

      {/* Container for button and its relative circular indicators */}
      <div className="button-with-indicators">
        {/* Main Button */}
        <button className="button" onClick={onClick}></button>

        {/* Circular Indicators - Now positioned relative to this container */}
        {/* Using the same positioning classes as ButtonVariant1 */}
        <span
          className={`circular-indicator indicator-pos-tl1 ${indicator1.isOn ? 'on' : ''}`}
          style={{ '--indicator-color': color1 }}
          title={`Indicator 1: ${indicator1.isOn ? 'On' : 'Off'}`}
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

export default ButtonVariant4;