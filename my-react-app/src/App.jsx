// src/App.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import Sidebar from './components/Sidebar';
import ButtonBox from './components/ButtonBox';
import RhythmsBox from './components/RhythmsBox'; // Import RhythmsBox
import Button from './components/Button';
import './App.css';

const App = () => {
  // Existing states...
  const [buttonsLeft] = useState([
    // ... (keep existing button definitions, but onClick might need adjustment later if they become controlled)
     { label: 'PC', onClick:    (newState) => handleButtonClick2('Left', 'PC', newState) },
     { label: 'ASY', onClick:   (newState) => handleButtonClick2('Left', 'ASY', newState) },
     { label: 'PEA', onClick:   (newState) => handleButtonClick2('Left', 'PEA', newState) },
     { label: 'VT', onClick:    (newState) => handleButtonClick2('Left', 'VT', newState) },
     { label: 'VF', onClick:    (newState) => handleButtonClick2('Left', 'VF', newState) },
     { label: 'OTHER', onClick: (newState) => handleButtonClick2('Left', 'OTHER', newState) },
  ]);

  const [buttonsRight] = useState([
    // ... (keep existing button definitions)
     { label: 'BICARB', onClick: (newState) => handleButtonClick2('Right', 'BICARB', newState) },
     { label: 'Ca2+', onClick:   (newState) => handleButtonClick2('Right', 'Ca2+', newState) },
     { label: 'NARCAN', onClick: (newState) => handleButtonClick2('Right', 'NARCAN', newState) },
     { label: 'D50', onClick:    (newState) => handleButtonClick2('Right', 'D50', newState) },
     { label: 'Mg2+', onClick:   (newState) => handleButtonClick2('Right', 'Mg2+', newState) },
     { label: 'LIDO', onClick:   (newState) => handleButtonClick2('Right', 'LIDO', newState) },
     { label: 'FLUIDS', onClick: (newState) => handleButtonClick2('Right', 'FLUIDS', newState) },
     { label: 'MISC', onClick:   (newState) => handleButtonClick2('Right', 'MISC', newState) },
  ]);

    // Example handler for the existing ButtonBox buttons if they were also controlled
    // Note: The current ButtonBox/Button setup doesn't fully support this yet without modification
    const handleButtonClick2 = (boxName, label, newState) => {
      console.log(`ButtonBox ${boxName}, Button ${label} - Indicator state reported: ${newState}`);
      // If these buttons were fully controlled, you would update App's state here
    };


  // --- State for RhythmsBox ---
  const [rhythmsBoxState, setRhythmsBoxState] = useState({
    // States for the 5 top buttons: 'off', 'solid', 'flashing'
    topButtons: ['off', 'off', 'off', 'off', 'off'],
    // State for the first button in the second row
    shockButton: 'off',
    // Timer value in seconds
    cprTimer: 120, // Example: 2 minutes countdown
    // State for the second button in the second row
    epiButton: 'off',
    // Counter value
    shockCounter: 0,
  });
  const [isCprTimerRunning, setIsCprTimerRunning] = useState(false); // State to control the timer

  // --- Handlers for RhythmsBox ---

  // Generic state transition logic (off -> solid -> flashing -> off)
  const getNextButtonState = (currentState) => {
    if (currentState === 'off') return 'solid';
    if (currentState === 'solid') return 'flashing';
    if (currentState === 'flashing') return 'off';
    return 'off'; // Default case
  };

  // Handler for the top 5 buttons in RhythmsBox
  const handleRhythmTopButtonClick = (index) => {
    setRhythmsBoxState(prevState => {
      const newTopButtons = [...prevState.topButtons];
      newTopButtons[index] = getNextButtonState(newTopButtons[index]);
      console.log(`RhythmsBox Top Button ${index + 1} clicked. New state: ${newTopButtons[index]}`);
      return { ...prevState, topButtons: newTopButtons };
    });
  };

  // Handler for the "SHOCK" button
  const handleShockButtonClick = () => {
    setRhythmsBoxState(prevState => {
        const nextState = getNextButtonState(prevState.shockButton);
        let newShockCounter = prevState.shockCounter;
        // Increment counter only when transitioning TO solid (or based on desired logic)
        if (nextState === 'solid' && prevState.shockButton === 'off') {
            newShockCounter += 1;
        }
        console.log(`RhythmsBox SHOCK Button clicked. New state: ${nextState}, Shocks: ${newShockCounter}`);
         // Example side-effect: Reset CPR timer on shock
        setIsCprTimerRunning(false); // Stop timer
        return {
            ...prevState,
            shockButton: nextState,
            shockCounter: newShockCounter,
            cprTimer: 120 // Reset timer value
        };
    });
     // Optionally restart timer automatically after shock
     // setIsCprTimerRunning(true);
  };

  // Handler for the "EPI" button
  const handleEpiButtonClick = () => {
    setRhythmsBoxState(prevState => {
        const nextState = getNextButtonState(prevState.epiButton);
        console.log(`RhythmsBox EPI Button clicked. New state: ${nextState}`);
        return { ...prevState, epiButton: nextState };
    });
  };

  // --- Timer Logic ---
  useEffect(() => {
    let interval = null;
    if (isCprTimerRunning && rhythmsBoxState.cprTimer > 0) {
      interval = setInterval(() => {
        setRhythmsBoxState(prevState => ({
          ...prevState,
          cprTimer: prevState.cprTimer - 1,
        }));
      }, 1000);
    } else if (!isCprTimerRunning || rhythmsBoxState.cprTimer === 0) {
      clearInterval(interval);
      setIsCprTimerRunning(false); // Ensure timer stops if it reaches 0
      if (rhythmsBoxState.cprTimer === 0) {
          console.log("CPR Timer Expired!");
          // Optionally trigger flashing or other indicators here
      }
    }
    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isCprTimerRunning, rhythmsBoxState.cprTimer]); // Dependencies

  // Function to toggle the timer (can be called from anywhere in App)
  const toggleCprTimer = () => {
    if (rhythmsBoxState.cprTimer > 0) { // Only start if timer > 0
        setIsCprTimerRunning(!isCprTimerRunning);
    } else {
        // Optionally reset and start if timer was 0
        setRhythmsBoxState(prev => ({ ...prev, cprTimer: 120 }));
        setIsCprTimerRunning(true);
    }
  };

  // Function to format timer seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  // --- Main Timer (existing) ---
  const [mainTimerSeconds, setMainTimerSeconds] = useState(0);
  const [isMainTimerRunning, setIsMainTimerRunning] = useState(false); // Initially stopped

    // Example: Start main timer on component mount
    useEffect(() => {
        setIsMainTimerRunning(true); // Start the main timer automatically
    }, []);


  useEffect(() => {
    let interval = null;
    if (isMainTimerRunning) {
        interval = setInterval(() => {
            setMainTimerSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    } else {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isMainTimerRunning]);


  // Render part
  return (
    <div className="App">
      <Sidebar />
      <div style={{ marginLeft: '60px', padding: '20px', flexGrow: 1 }}> {/* Adjust marginLeft based on sidebar state */}
        <div className="header">
          <div className="timer" id="timer">
            {/* Display main timer */}
            {formatTime(mainTimerSeconds)}
          </div>
          <div className="spacer"></div>
          <div className="logo" id="logo">
            <img src="src/assets/code_clock_logo.webp" alt="Code Clock Logo" />
          </div>
        </div>

        <div className="button-container">
          {/* Existing ButtonBoxes - Note: Their state is currently self-managed */}
          <ButtonBox buttons={buttonsLeft} columns={3} />
          <ButtonBox buttons={buttonsRight} columns={4} />

          {/* Add the RhythmsBox, passing state and handlers */}
          <RhythmsBox
            // Pass state values
            topButtonStates={rhythmsBoxState.topButtons}
            shockButtonState={rhythmsBoxState.shockButton}
            timerValue={formatTime(rhythmsBoxState.cprTimer)} // Pass formatted time
            epiButtonState={rhythmsBoxState.epiButton}
            counterValue={rhythmsBoxState.shockCounter}
            isTimerRunning={isCprTimerRunning} // Pass timer status

            // Pass handler functions
            onTopButtonClick={handleRhythmTopButtonClick}
            onShockButtonClick={handleShockButtonClick}
            onEpiButtonClick={handleEpiButtonClick}
            onTimerClick={toggleCprTimer} // Pass function to toggle timer
          />
        </div>

        <div className="bottom-buttons red-boxd">
          {/* These buttons are also controlled now */}
          <Button label="END" onClick={() => console.log(`END clicked`)} visualState={'off'} />
          <Button label="ROSC" onClick={() => console.log(`ROSC clicked`)} visualState={'off'} />
          <Button label="ECMO" onClick={() => console.log(`ECMO clicked`)} visualState={'off'} />
          <Button label="EXPIRED" onClick={() => console.log(`EXPIRED clicked`)} visualState={'off'} />
          {/* Example: Button in App to directly change RhythmsBox state */}
           <Button label="Flash EPI Externally" onClick={() => setRhythmsBoxState(prev => ({...prev, epiButton: 'flashing'}))} visualState={'off'} />
           <Button label="Toggle CPR Timer" onClick={toggleCprTimer} visualState={isCprTimerRunning ? 'solid' : 'off'} />
        </div>
      </div>
    </div>
  );
};

export default App;