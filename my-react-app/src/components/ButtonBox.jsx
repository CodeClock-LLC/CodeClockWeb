// // src/components/ButtonBox.jsx
// import React from 'react';
// import Button from './Button';

// const ButtonBox = ({ buttons, columns }) => {
//   return (
//     <div className={`button-box-${columns}col`}>
//       {buttons.map((button, index) => (
//         <Button key={index} label={button.label} onClick={button.onClick} />
//       ))}
//     </div>
//   );
// };

// export default ButtonBox;

// src/components/ButtonBox.jsx
import React from 'react';
import Button from './Button';

const ButtonBox = ({ buttons, columns }) => {
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
      {buttons.map((button, index) => (
        <Button key={index} label={button.label} onClick={button.onClick} />
      ))}
    </div>
  );
};

export default ButtonBox;