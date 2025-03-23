// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [buttonsLeft] = useState([
    { label: 'PC', onClick:    (newState) => handleButtonClick2(newState) },
    { label: 'ASY', onClick:   (newState) => handleButtonClick2(newState) },
    { label: 'PEA', onClick:   (newState) => handleButtonClick2(newState) },
    { label: 'VT', onClick:    (newState) => handleButtonClick2(newState) },
    { label: 'VF', onClick:    (newState) => handleButtonClick2(newState) },
    { label: 'OTHER', onClick: (newState) => handleButtonClick2(newState) },
  ]);

  const [buttonsRight] = useState([
    { label: 'BICARB', onClick: (newState) => handleButtonClick2(newState) },
    { label: 'Ca2+', onClick: (newState)   => handleButtonClick2(newState) },
    { label: 'NARCAN', onClick: (newState) => handleButtonClick2(newState) },
    { label: 'D50', onClick: (newState)    => handleButtonClick2(newState) },
    { label: 'Mg2+', onClick: (newState)   => handleButtonClick2(newState) },
    { label: 'LIDO', onClick: (newState)   => handleButtonClick2(newState) },
    { label: 'FLUIDS', onClick: (newState) => handleButtonClick2(newState) },
    { label: 'MISC', onClick: (newState)   => handleButtonClick2(newState) },
  ]);

  const handleButtonClick = (index) => {
    console.log(`Button at index ${index} clicked`);
  };

  const handleButtonClick2 = (newState) => {
    console.log(`Indicator state is: ${newState}`);
  };

  const [timer, setTimer] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const startTimer = () => {
    setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  React.useEffect(() => {
    setTimer(`${formatTime(minutes)}:${formatTime(seconds)}`);
  }, [minutes, seconds]);

  return (
    <div className="App">
      <Sidebar />
      <div className="header">
        <div className="timer" id="timer">
          {timer}
        </div>
        <div className="spacer"></div>
        <div className="logo" id="logo">
          <img src="src/assets/code_clock_logo.webp" alt="Code Clock Logo" />
        </div>
      </div>
      <div className="button-container">
        <ButtonBox buttons={buttonsLeft} columns={3} />
        <ButtonBox buttons={buttonsRight} columns={4} />
      </div>
      <div className="button-container">
        {/* Add more ButtonBox components as needed */}
      </div>
      <div className="bottom-buttons red-boxd">
        <Button label="END" onClick={(newState) => console.log(`Indicator state is: ${newState}`)} />
        
        <Button label="ROSC" onClick={(newState) => console.log(`Indicator state is: ${newState}`)} />
        <Button label="ECMO" onClick={(newState) => console.log(`Indicator state is: ${newState}`)} />
        <Button label="EXPIRED" onClick={(newState) => console.log(`Indicator state is: ${newState}`)} />
      </div>
    </div>
  );
};

export default App;
