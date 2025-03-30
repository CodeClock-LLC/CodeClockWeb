// src/components/RhythmsBox.jsx
import React from 'react';
import Button from './Button';
import './RhythmsBox.css'; // We'll create this CSS file

// Destructure props received from App.jsx
const RhythmsBox = ({
  topButtonStates,
  shockButtonState,
  timerValue,
  epiButtonState,
  counterValue,
  isTimerRunning,
  onTopButtonClick,
  onShockButtonClick,
  onEpiButtonClick,
  onTimerClick // Handler for clicking the timer display
}) => {

  // Labels for the top buttons (could also be passed as props)
  const topButtonLabels = ['ASYSTOLE', 'PEA', 'VT PULSE', 'VFIB', 'PULSELESS VT'];

  return (
    // Apply the red-boxd style and a specific class for RhythmsBox layout
    <div className="rhythms-box red-boxd">
      {/* Row 1: 5 Buttons */}
      <div className="rhythms-row">
        {topButtonLabels.map((label, index) => (
          <Button
            key={`rhythm-top-${index}`}
            label={label}
            // Pass the specific state for this button from the array
            visualState={topButtonStates[index]}
            // Pass the handler, wrapping it to include the index
            onClick={() => onTopButtonClick(index)}
          />
        ))}
      </div>

      {/* Row 2: Button, Timer, Button, Counter */}
      <div className="rhythms-row">
        {/* Shock Button */}
        <Button
          label="SHOCK"
          visualState={shockButtonState}
          onClick={onShockButtonClick}
        />

        {/* Timer Display - Make it clickable */}
        <div
            className={`rhythms-timer ${isTimerRunning ? 'timer-running' : 'timer-stopped'}`}
            onClick={onTimerClick} // Call the handler when clicked
            title={isTimerRunning ? "Click to Pause Timer" : "Click to Start Timer"} // Tooltip
        >
          <span className="timer-label">CPR TIMER</span>
          <span className="timer-value">{timerValue}</span>
        </div>

        {/* Epinephrine Button */}
        <Button
          label="EPI"
          visualState={epiButtonState}
          onClick={onEpiButtonClick}
        />

        {/* Counter Display */}
        <div className="rhythms-counter">
           <span className="counter-label">SHOCKS</span>
           <span className="counter-value">{counterValue}</span>
        </div>
      </div>
    </div>
  );
};

export default RhythmsBox;