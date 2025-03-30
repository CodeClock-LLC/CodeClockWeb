// src/App.jsx
import React, { useEffect } from 'react'; // Import useEffect
import { useSelector, useDispatch } from 'react-redux';
import store from './redux/store';

// UI Components
import Sidebar from './components/Sidebar';
// Import ALL Box Components
import PulseCheckBox from './components/pulseCheckBox'; // Corrected case
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
import { tickTotalTimer } from './redux/mainTimerSlice'; // Import total timer action

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

  // Select log entries for download functionality
  const logEntries = useSelector((state) => state.log.entries);
  // Select running state for the total timer
  const isTotalTimerRunning = useSelector((state) => state.mainTimer.isRunning);

  // --- Effect for the Total Elapsed Timer ---
  useEffect(() => {
    let interval = null;
    if (isTotalTimerRunning) {
       interval = setInterval(() => {
           dispatch(tickTotalTimer());
       }, 1000);
    } else {
        clearInterval(interval);
    }
    // Cleanup interval on component unmount or if timer stops
    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
  }, [isTotalTimerRunning, dispatch]); // Depend on running state and dispatch


  // --- Log Download/Clear Handlers ---
   const handleDownloadLog = (format = 'json') => { /* ... download handler ... */
    if (!logEntries || logEntries.length === 0) {
        alert("Log is empty.");
        return;
    }
    let data, fileType, fileName = `codeclock_log_${new Date().toISOString().split('T')[0]}`;
    if (format === 'json') {
        data = JSON.stringify(logEntries, null, 2); fileType = 'application/json'; fileName += '.json';
    } else if (format === 'csv') {
        const header = Object.keys(logEntries[0] || {}).join(',');
        const rows = logEntries.map(entry => Object.values(entry).map(val => JSON.stringify(val ?? '')).join(',')); // Handle null/undefined
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


  return (
    <div className="App">
      {/* <Sidebar /> */} {/* Temporarily commented out if causing issues */}
      <div style={{ padding: '20px' }}> {/* Simplified layout for testing */}
        <div className="header">
          {/* Header Controls */}
          <button onClick={handleLogCurrentState} >Log Full State</button>
          <button onClick={() => handleDownloadLog('json')} >Download Log (JSON)</button>
          <button onClick={() => handleDownloadLog('csv')} >Download Log (CSV)</button>
          <button onClick={handleClearLog} style={{ color: 'orange' }}>Clear Log</button>
          <div className="spacer"></div>
          {/* Logo removed from header as it's now in PulseCheckBox */}
        </div>

        <div className="boxes-container" style={{ marginTop: '20px' }}>
            {/* == Render ALL Box Components == */}
            <PulseCheckBox /> {/* Render the redesigned component */}
            <RhythmsBox />
            <MedsBox />
            <TasksBox />
            <RolesBox />
            {/* <Meds2Box /> */}{/* Still commented out if not ready */}
            <ViewsBox />
            <EndStatesBox />
        </div>
      </div>
    </div>
  );
};

export default App;
