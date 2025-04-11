// src/App.jsx
import React, { useEffect, useState } from 'react'; // Import useState
import { useSelector, useDispatch } from 'react-redux';
import store from './redux/store';

// UI Components
import Sidebar from './components/Sidebar';
import IntroPopup from './components/IntroPopup'; // <-- Import the new popup component
// Import ALL Box Components
import PulseCheckBox from './components/pulseCheckBox';
import RhythmsBox from './components/RhythmsBox';
import MedsBox from './components/MedsBox';
import TasksBox from './components/TasksBox';
import RolesBox from './components/RolesBox';
// import Meds2Box from './components/Meds2Box';
import ViewsBox from './components/ViewsBox';
import EndStatesBox from './components/EndStatesBox';
import './App.css';

// Actions
import { clearLog } from './redux/logSlice';
import { tickTotalTimer } from './redux/mainTimerSlice';

// Utility for downloading
const downloadFile = ({ data, fileName, fileType }) => { /* ... download function ... */
  const blob = new Blob([data], { type: fileType });
  const link = document.createElement('a');
  link.download = fileName;
  link.href = window.URL.createObjectURL(blob);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
};


const App = () => {
  const dispatch = useDispatch();

  // --- State for Popup Visibility ---
  const [showPopup, setShowPopup] = useState(true); // Start with popup visible

  // Selectors
  const logEntries = useSelector((state) => state.log.entries);
  const isTotalTimerRunning = useSelector((state) => state.mainTimer.isRunning);

  // --- Effect for the Total Elapsed Timer ---
  useEffect(() => {
    let interval = null;
    // Only run the timer if the popup is NOT shown
    if (isTotalTimerRunning && !showPopup) {
       interval = setInterval(() => {
           dispatch(tickTotalTimer());
       }, 1000);
    } else {
        clearInterval(interval);
    }
    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
    // Add showPopup to dependencies - timer starts/stops based on it
  }, [isTotalTimerRunning, showPopup, dispatch]);


  // --- Handlers ---
   const handleDownloadLog = (format = 'json') => { /* ... download handler ... */
    if (!logEntries || logEntries.length === 0) {
        alert("Log is empty."); return;
    }
    let data, fileType, fileName = `codeclock_log_${new Date().toISOString().split('T')[0]}`;
    if (format === 'json') {
        data = JSON.stringify(logEntries, null, 2); fileType = 'application/json'; fileName += '.json';
    } else if (format === 'csv') {
        const header = Object.keys(logEntries[0] || {}).join(',');
        const rows = logEntries.map(entry => Object.values(entry).map(val => JSON.stringify(val ?? '')).join(','));
        data = [header, ...rows].join('\n'); fileType = 'text/csv'; fileName += '.csv';
    } else { return; }
    downloadFile({ data, fileName, fileType });
  };

  const handleClearLog = () => { /* ... clear handler ... */
      if (window.confirm("Are you sure you want to clear the entire event log?")) {
         dispatch(clearLog());
      }
  }

  const handleLogCurrentState = () => { /* ... log state handler ... */
      const currentState = store.getState();
      console.groupCollapsed(`%c[${new Date().toLocaleTimeString()}] Current Redux State`, 'color: blue; font-weight: bold;');
      console.log(JSON.stringify(currentState, null, 2));
      console.groupEnd();
   };

   // --- Handler to close the popup ---
   const handleClosePopup = () => {
       setShowPopup(false);
       // Optional: Start the main timer explicitly here if needed,
       // though the useEffect dependency change will handle it.
       // dispatch(startTotalTimer());
   };

   // --- Popup Description Text ---
   const popupDescription = `This is a demo of the CodeClockWeb application, a tool designed to assist with coordination during cardiac arrest scenarios based on ACLS guidelines. Use the buttons to simulate events and track progress. The log can be downloaded using the buttons in the header. Note: This is a proof-of-concept with placeholder labels and simplified logic, not representative of the final product. This application is capable of functioning cross-platform and is highly reconfigurable to user needs. Please note that this application is designed to run on a tablets with a standard 4:3 aspect ratio. User experience on smaller devices may vary.`;


  return (
    <div className="App">
        {/* --- Conditional Rendering --- */}
        {showPopup ? (
            // Show Popup if showPopup is true
            <IntroPopup
                description={popupDescription}
                onClose={handleClosePopup}
            />
        ) : (
            // Show Main App Content if showPopup is false
            <> {/* Use Fragment to group main content */}
                {/* <Sidebar /> */} {/* Keep commented if not fully integrated */}
                <div style={{ padding: '20px' }}> {/* Simplified layout */}
                    <div className="header">
                        {/* Header Controls */}
                        <button onClick={handleLogCurrentState} >Log Full State</button>
                        <button onClick={() => handleDownloadLog('json')} >Download Log (JSON)</button>
                        <button onClick={() => handleDownloadLog('csv')} >Download Log (CSV)</button>
                        <button onClick={handleClearLog} style={{ color: 'orange' }}>Clear Log</button>
                        <div className="spacer"></div>
                    </div>

                    <div className="boxes-container" style={{ marginTop: '20px' }}>
                        {/* Render ALL Box Components */}
                        <PulseCheckBox />
                        <RhythmsBox />
                        <MedsBox />
                        <TasksBox />
                        <RolesBox />
                        {/* <Meds2Box /> */}
                        <ViewsBox />
                        <EndStatesBox />
                    </div>
                </div>
            </>
        )}
        {/* --- End Conditional Rendering --- */}
    </div>
  );
};

export default App;