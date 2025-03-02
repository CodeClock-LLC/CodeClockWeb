// // src/components/Button.jsx
// import React from 'react';

// const Button = ({ label, onClick }) => {
//   return (
//     <div className="button-wrapper">
//       <span className="button-label">{label}</span>
//       <div className="outer-button" onClick={onClick}>
//         <div className="inner-circle"></div>
//       </div>
//     </div>
//   );
// };

// export default Button;


// src/components/Button.jsx
import React, { useState } from 'react';

const Button = ({ label, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <div className="button-wrapper">
      <span className="button-label">{label}</span>
      <div className="outer-button" onClick={handleClick}>
        <div className={`inner-circle ${isActive ? 'red' : ''}`}></div>
      </div>
    </div>
  );
};

export default Button;