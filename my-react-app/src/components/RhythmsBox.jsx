// src/components/ButtonBox.jsx
import React, { useState } from 'react';
import Button from './Button';

const ButtonBox = ({ buttons, columns, toggleBlink, toggleActive }) => {
  const [buttonStates, setButtonStates] = useState(
    buttons.map(() => ({ isActive: false, shouldBlink: false }))
  );

  const handleStateChange = (index, newState) => {
    const updatedStates = [...buttonStates];
    updatedStates[index] = newState;
    setButtonStates(updatedStates);
  };

  const getButtonBoxClass = () => {
    switch (columns) {
      case 3:
        return 'button-box-3col';
      case 4:
        return 'button-box-4col';
      default:
        return 'button-box-4col';
    }
  };

  return (
    <div className={`${getButtonBoxClass()} red-boxd`}>
        <Button
          key='r1'
          label='ASYSTOLE'
          onClick={() => button.onClick(index)}
          isActive={buttonStates[index].isActive}
          shouldBlink={buttonStates[index].shouldBlink}
          onStateChange={(label, newState) => handleStateChange(index, newState)}
        />
    </div>
    // There should be several more buttons but also timers and counters, they should be connected to some 
    // centralized event tracker / updater that can update any of the values in counters or timers here.
    // This should be passed as a parameter to the RythmsBox component.
    // You should be able to update the state of a component of rhythmbox or any similar object using
    // a call to the specific box and the element you want to update + the state you want to change.
  );
};

export default ButtonBox;
