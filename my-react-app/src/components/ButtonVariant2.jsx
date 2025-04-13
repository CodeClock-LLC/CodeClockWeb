// src/components/ButtonVariant2.jsx
import React from 'react';
import './ButtonVariants.css'; // Import shared styles

// Define default colors
const DEFAULT_COLOR_TL1 = '#FFC300'; // Yellow
const DEFAULT_COLOR_TL2 = '#C70039'; // Red
const DEFAULT_COLOR_TL3 = '#900C3F'; // Dark Red
const DEFAULT_COLOR_BL = '#581845';  // Purple

/**
 * ButtonVariant2 Component
 * - Label above main button
 * - Main circular button
 * - Three vertically stacked circular indicators top-left
 * - One circular indicator bottom-left
 *
 * Props:
 * - label: string
 * - onClick: function
 * - indicatorTL1, indicatorTL2, indicatorTL3: { isOn: boolean, color?: string }
 * - indicatorBL: { isOn: boolean, color?: string }
 */
const ButtonVariant2 = ({
  label,
  onClick,
  indicatorTL1 = { isOn: false },
  indicatorTL2 = { isOn: false },
  indicatorTL3 = { isOn: false },
  indicatorBL = { isOn: false }
}) => {

  const colorTL1 = indicatorTL1.color || DEFAULT_COLOR_TL1;
  const colorTL2 = indicatorTL2.color || DEFAULT_COLOR_TL2;
  const colorTL3 = indicatorTL3.color || DEFAULT_COLOR_TL3;
  const colorBL = indicatorBL.color || DEFAULT_COLOR_BL;

  return (
    <div className="button-variant-wrapper">
      {/* Label */}
      <span className="button-label">{label}</span>

      {/* Main Button */}
      <button className="button" onClick={onClick}></button>

      {/* Top-Left Circular Indicators */}
      <span
        className={`circular-indicator indicator-pos-tl1 ${indicatorTL1.isOn ? 'on' : ''}`}
        style={{ '--indicator-color': colorTL1 }}
        title={`Indicator TL1: ${indicatorTL1.isOn ? 'On' : 'Off'}`}
      />
      <span
        className={`circular-indicator indicator-pos-tl2 ${indicatorTL2.isOn ? 'on' : ''}`}
        style={{ '--indicator-color': colorTL2 }}
        title={`Indicator TL2: ${indicatorTL2.isOn ? 'On' : 'Off'}`}
      />
      <span
        className={`circular-indicator indicator-pos-tl3 ${indicatorTL3.isOn ? 'on' : ''}`}
        style={{ '--indicator-color': colorTL3 }}
        title={`Indicator TL3: ${indicatorTL3.isOn ? 'On' : 'Off'}`}
      />

      {/* Bottom-Left Circular Indicator */}
       <span
        className={`circular-indicator indicator-pos-bl ${indicatorBL.isOn ? 'on' : ''}`}
        style={{ '--indicator-color': colorBL }}
        title={`Indicator BL: ${indicatorBL.isOn ? 'On' : 'Off'}`}
      />
    </div>
  );
};

export default ButtonVariant2;
