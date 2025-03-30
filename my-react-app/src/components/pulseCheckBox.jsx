// src/components/PulseCheckBox.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button'; // Reusable Button component
import './PulseCheckBox.css'; // Specific styles for this component
import logoPath from '../assets/code_clock_logo.webp';

// Import actions and the button ID from the pulseCheck slice
import {
    togglePulseCheckButton,
    setPulseCheckButtonState,
    tickPulseCheckTimer,
    togglePulseCheckTimerRunning,
    stopPulseCheckTimer,
    PULSE_CHECK_BUTTON_ID // Use the exported ID
} from '../redux/pulseCheckSlice';

// Import selector for the total timer
// Note: Total timer logic (ticking) should be handled in App.jsx or a higher-level component

// Utility function to format time (MM:SS)
const formatTime = (totalSeconds) => {
    if (totalSeconds < 0) totalSeconds = 0; // Ensure time doesn't go negative
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Assume logo path - adjust if necessary
// const logoPath = '../assets/code_clock_logo.webp'; // Or wherever your logo is relative to public/ or src/

const PulseCheckBox = () => {
    const dispatch = useDispatch();

    // Select state from the pulsecheck slice
    const {
        buttonState,
        pulseCheckTimerSeconds,
        isPulseCheckTimerRunning
    } = useSelector((state) => state.pulsecheck);

    // Select state from the mainTimer slice
    const { totalSeconds: totalTimeSeconds } = useSelector((state) => state.mainTimer);

    // Effect to handle the pulse check countdown timer
    useEffect(() => {
        let interval = null;
        if (isPulseCheckTimerRunning && pulseCheckTimerSeconds > 0) {
            interval = setInterval(() => {
                dispatch(tickPulseCheckTimer());
            }, 1000);
        } else if (pulseCheckTimerSeconds <= 0 && isPulseCheckTimerRunning) {
            // Timer reached zero
            dispatch(stopPulseCheckTimer()); // Stop the timer
            dispatch(setPulseCheckButtonState('flashing')); // Make button flash
            // Optionally dispatch other actions when timer expires
            console.log("Pulse Check Timer Expired!");
        }

        // Cleanup interval on unmount or when dependencies change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPulseCheckTimerRunning, pulseCheckTimerSeconds, dispatch]);

    // Handler for clicking the pulse check button
    const handlePulseCheckButtonClick = () => {
        // Dispatch toggle action - logging middleware will handle logging this
        dispatch(togglePulseCheckButton());
        // You might want additional logic here, e.g., resetting the timer
        // dispatch(resetPulseCheckTimer());
    };

    // Handler for clicking the pulse check timer display
    const handleTimerClick = () => {
        dispatch(togglePulseCheckTimerRunning());
    };

    return (
        // Use a specific class for easier styling + red-boxd
        <div className="pulse-check-box red-boxd">
            {/* Row container using Flexbox */}
            <div className="pulse-check-row">
                {/* 1. Pulse Check Button */}
                <Button
                    // Use the specific ID defined in the slice if needed, otherwise label is fine
                    label="Pulse Check"
                    visualState={buttonState}
                    onClick={handlePulseCheckButtonClick}
                />

                {/* 2. Pulse Check Clock (Countdown) */}
                <div
                    className={`timer-display pulse-timer ${isPulseCheckTimerRunning ? 'timer-running' : 'timer-stopped'}`}
                    onClick={handleTimerClick}
                    title={isPulseCheckTimerRunning ? "Pause Pulse Check Timer" : "Start Pulse Check Timer"}
                >
                    <span className="timer-label">PULSE CHECK</span>
                    <span className="timer-value">{formatTime(pulseCheckTimerSeconds)}</span>
                </div>

                {/* 3. Code Clock Logo */}
                <div className="logo-container">
                    <img
                        src={logoPath}
                        alt="Code Clock Logo"
                        className="code-clock-logo"
                        onError={(e) => { e.target.style.display = 'none'; console.error("Logo failed to load:", logoPath); }} // Basic error handling
                    />
                </div>

                {/* 4. Total Time Clock (Stopwatch) */}
                <div className="timer-display total-timer">
                    <span className="timer-label">TOTAL TIME</span>
                    <span className="timer-value">{formatTime(totalTimeSeconds)}</span>
                </div>
            </div>
        </div>
    );
};

export default PulseCheckBox;

