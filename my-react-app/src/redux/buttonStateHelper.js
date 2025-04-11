// src/redux/buttonStateHelper.js
export const getNextButtonState = (currentState) => {
    if (currentState === 'off') return 'solid';
    if (currentState === 'solid') return 'flashing';
    if (currentState === 'flashing') return 'off';
    return 'off';
};