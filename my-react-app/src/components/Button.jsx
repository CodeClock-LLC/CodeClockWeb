// src/components/Button.jsx
import React, { useState, useEffect } from 'react';

// Make Button controlled: It receives its visual state via props and calls onClick when clicked.
const Button = ({ label, onClick, visualState = 'off' }) => { // Receive visualState prop, default to 'off'
  const [blink, setBlink] = useState(false); // Blinking is purely visual, can stay internal if desired

  // Effect to manage blinking based on the visualState prop
  useEffect(() => {
    let blinkInterval;
    if (visualState === 'flashing') {
      setBlink(false); // Start in a consistent state
      blinkInterval = setInterval(() => {
        setBlink((prev) => !prev); // Toggle blinking every 500ms
      }, 500);
    } else {
      setBlink(false); // Ensure blink is off if not flashing
    }
    // Cleanup function
    return () => {
      if (blinkInterval) {
        clearInterval(blinkInterval);
      }
    };
  }, [visualState]); // Re-run effect if visualState changes

  // Determine indicator style based on the visualState prop
  const getIndicatorStyle = () => {
    if (visualState === 'solid') {
      return { backgroundColor: 'green' };
    } else if (visualState === 'flashing') {
      // Use the internal blink state for the flashing effect
      return { backgroundColor: blink ? 'red' : 'grey' };
    } else {
      return { backgroundColor: '#ddd' }; // Default 'off' color
    }
  };

  // When the button is physically clicked, just call the onClick handler passed from the parent.
  // The parent (`App.jsx`) will be responsible for determining the *next* state.
  const handleClick = () => {
    if (onClick) {
      onClick(); // Notify the parent component of the click event
    }
  };

  return (
    <div className="button-wrapper">
      <span className="button-label">{label}</span>
      <div className="indicator" style={getIndicatorStyle()}></div>
      <button className="button" onClick={handleClick}></button>
    </div>
  );
};

export default Button;