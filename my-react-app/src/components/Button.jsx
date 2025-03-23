import React, { useState, useEffect } from 'react';

const Button = ({ label, onClick }) => {
  const [indicatorState, setIndicatorState] = useState('off'); // Track the state of the indicator
  const [blink, setBlink] = useState(false); // Blink state for flashing indicator

  // Effect to manage blinking when the indicator is flashing
  useEffect(() => {
    if (indicatorState === 'flashing') {
      const blinkInterval = setInterval(() => {
        setBlink((prev) => !prev); // Toggle blinking every 500ms
      }, 500);
      return () => clearInterval(blinkInterval); // Cleanup the interval when the component unmounts or when state changes
    }
  }, [indicatorState]);

  // Toggle indicator state on button click
  const handleClick = () => {
    let newIndicatorState = 'off';

    if (indicatorState === 'off') {
      newIndicatorState = 'solid'; // Set the indicator to solid when clicked
    } else if (indicatorState === 'solid') {
      newIndicatorState = 'flashing'; // Set the indicator to flashing when clicked
    } else if (indicatorState === 'flashing') {
      newIndicatorState = 'off'; // Reset to off when clicked
    }

    setIndicatorState(newIndicatorState); // Update the state
    onClick(newIndicatorState); // Pass the state change to the parent component if necessary
  };

  // Set the indicator color based on its state
  const getIndicatorStyle = () => {
    if (indicatorState === 'solid') {
      return { backgroundColor: 'green' };
    } else if (indicatorState === 'flashing') {
      return { backgroundColor: blink ? 'red' : 'grey' };
    } else {
      return { backgroundColor: '#ddd' }; // Default color
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
