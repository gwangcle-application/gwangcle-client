import React, { forwardRef } from 'react';


const RadioSelectPage = forwardRef(({ show, onCancel, options, selected, onSelect }, ref) => {
  if (!show) {
    return null;
  }

  return (
    <div className="radio-popup" ref={ref}>
      <div className="radio-popup-content">
        {options.map(([value, label, key]) => (
          <div key={key}>
            <input
              type="radio"
              name="difficulty"
              value={value}
              checked={selected === key}
              onChange={() => onSelect(key)}
            />
            {label}
          </div>
        ))}
        <br />
        <button onClick={onCancel} className="cancel">
          취소
        </button>
      </div>
    </div>
  );
});

export default RadioSelectPage;
