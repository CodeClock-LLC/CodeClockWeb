// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import './App.css';

const App = () => {
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

  const buttonsLeft = [
    { label: 'PC', onClick: () => {} },
    { label: 'ASY', onClick: () => {} },
    { label: 'PEA', onClick: () => {} },
    { label: 'VT', onClick: () => {} },
    { label: 'VF', onClick: () => {} },
    { label: 'OTHER', onClick: () => {} },
  ];

  const buttonsRight = [
    { label: 'BICARB', onClick: () => {} },
    { label: 'Ca2+', onClick: () => {} },
    { label: 'NARCAN', onClick: () => {} },
    { label: 'D50', onClick: () => {} },
    { label: 'Mg2+', onClick: () => {} },
    { label: 'LIDO', onClick: () => {} },
    { label: 'FLUIDS', onClick: () => {} },
    { label: 'MISC', onClick: () => {} },
  ];

  return (
    <div className="App">
      <Sidebar />
      <div className="header">
        <div className="timer" id="timer">
          {timer}
        </div>
        <div className='spacer'></div>
        <div className="logo" id="logo">
          <img src="src/assets/code_clock_logo.webp" alt="Code Clock Logo"></img>
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
        <Button label="END" onClick={() => {}} />
        <Button label="ROSC" onClick={() => {}} />
        <Button label="ECMO" onClick={() => {}} />
        <Button label="EXPIRED" onClick={() => {}} />
      </div>
    </div>
  );
};

export default App;