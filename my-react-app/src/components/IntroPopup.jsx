// src/components/IntroPopup.jsx
import React from 'react';
import './IntroPopup.css'; // We'll create this CSS file
import logoPath from '../assets/code_clock_logo.webp';

const IntroPopup = ({ description, onClose }) => {
  return (
    // Overlay covers the whole screen
    <div className="popup-overlay">
      {/* Content box centered within the overlay */}
      <div className="popup-content">
        <img
            src={logoPath}
            alt="Code Clock Logo"
            className="code-clock-logo"
            onError={(e) => { e.target.style.display = 'none'; console.error("Logo failed to load:", logoPath); }} // Basic error handling
        />
        <div></div>
        <h2>Welcome!</h2>
        {/* Display the description text passed as a prop */}
        <p>{description}</p>
        {/* Button to close the popup */}
        <button onClick={onClose} className="popup-close-button">
          Ok
        </button>
      </div>
    </div>
  );
};

export default IntroPopup;
