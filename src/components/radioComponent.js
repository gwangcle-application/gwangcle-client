import React from 'react';

const RadioSelectPage = ({ show, onClose, options, selected, onSelect }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="radio-popup">
      <div className="radio-popup-content">
        {options.map(([key, label, value]) => (
          <div key={key}>
            <input
              type="radio"
              name="difficulty"
              value={value}
              checked={selected === value}
              onChange={(e) => onSelect(e.target.value)}
            />
            {label}
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RadioSelectPage;