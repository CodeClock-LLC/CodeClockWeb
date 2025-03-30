// src/App.jsx
import React from 'react'; // Removed unused useState, useEffect
import { useSelector, useDispatch } from 'react-redux';
// import store from './redux/store'; // Not needed directly for logging anymore

import Sidebar from './components/Sidebar';
// Import Box Components (assuming you created them all)
import PulseCheckBox from './components/pulseCheckBox';
import RhythmsBox from './components/RhythmsBox';
import MedsBox from './components/MedsBox';
import TasksBox from './components/TasksBox';
import RolesBox from './components/RolesBox';
import Meds2Box from './components/Meds2Box';
import ViewsBox from './components/ViewsBox';
import EndStatesBox from './components/EndStatesBox';
// Import Button if needed for other controls
// import Button from './components/Button';
import './App.css';

// Import log actions if needed (e.g., for clearLog)
import { clearLog } from './redux/logSlice';

// Utility for downloading
const downloadFile = ({ data, fileName, fileType }) => {
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

  // Select the log entries from the store
  const logEntries = useSelector((state) => state.log.entries);

  // --- Main Timer (Local State - keep if needed, otherwise remove) ---
  // const [mainTimerSeconds, setMainTimerSeconds] = useState(0);
  // const [isMainTimerRunning, setIsMainTimerRunning] = useState(true);
  // ... timer useEffect logic ...

  // --- Helper Functions ---
  // const formatTime = (totalSeconds) => { ... }; // Keep if main timer is used
  // const handleLogCurrentState = () => { ... }; // Keep if useful for debugging full state

  // --- Log Download Handler ---
   const handleDownloadLog = (format = 'json') => {
    if (!logEntries || logEntries.length === 0) {
        alert("Log is empty.");
        return;
    }

    let data;
    let fileType;
    let fileName = `codeclock_log_${new Date().toISOString().split('T')[0]}`;

    if (format === 'json') {
        data = JSON.stringify(logEntries, null, 2);
        fileType = 'application/json';
        fileName += '.json';
    } else if (format === 'csv') {
        // Basic CSV conversion
        const header = Object.keys(logEntries[0]).join(',');
        const rows = logEntries.map(entry => Object.values(entry).map(JSON.stringify).join(',')); // Stringify values to handle commas within
        data = [header, ...rows].join('\n');
        fileType = 'text/csv';
        fileName += '.csv';
    } else {
        console.error("Unsupported log format:", format);
        return;
    }

    downloadFile({ data, fileName, fileType });
  };

  const handleClearLog = () => {
      if (window.confirm("Are you sure you want to clear the entire event log?")) {
         dispatch(clearLog());
      }
  }


  return (
    <div className="App">
      <Sidebar />
      <div style={{ marginLeft: '60px', padding: '20px', flexGrow: 1 }}>
        <div className="header">
          {/* <div className="timer" id="timer">{formatTime(mainTimerSeconds)}</div> */}
          {/* <button onClick={handleLogCurrentState} style={{ marginLeft: '20px' }}>Log Full State</button> */}
          <button onClick={() => handleDownloadLog('json')} style={{ marginLeft: '10px' }}>Download Log (JSON)</button>
          <button onClick={() => handleDownloadLog('csv')} style={{ marginLeft: '10px' }}>Download Log (CSV)</button>
           <button onClick={handleClearLog} style={{ marginLeft: '10px', color: 'orange' }}>Clear Log</button>
          <div className="spacer"></div>
          <div className="logo">{/* ... */}</div>
        </div>

        {/* Container for all the boxes */}
        <div className="boxes-container"> {/* Style this container if needed */}
            <PulseCheckBox />
            <RhythmsBox />
            <MedsBox />
            <TasksBox />
            <RolesBox />
            <Meds2Box />
            <ViewsBox />
            <EndStatesBox />
            {/* Add other UI elements as needed */}
        </div>

      </div>
    </div>
  );
};

export default App;