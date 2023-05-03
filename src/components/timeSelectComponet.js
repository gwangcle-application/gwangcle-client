import React, { useState, useRef, useEffect } from 'react';
import '../css/time.css';

const timeOrder = { "오전": 1, "오후": 2, "저녁": 3 };
const timesData = {
  0: '오전',
  1: '오후',
  2: '저녁',
};

const TimeSelectPage = ({ onTimesChange }) => {
  const [times, setTimes] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef();

  const handleCheckboxChange = (e) => {
    const checkedTime = e.target.value;
    if (e.target.checked) {
      if (!times.includes(checkedTime)) {
        setTimes((prevState) => [...prevState, checkedTime]);
      }
    } else {
      setTimes((prevState) => prevState.filter((time) => time !== checkedTime));
    }
  };

  const handlePopupClose = (event) => {
    event.preventDefault();
    const sortedTimes = times.sort((a, b) => timeOrder[a] - timeOrder[b]);
    onTimesChange(sortedTimes);
    setPopupVisible(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setTimes([]);
    onTimesChange([]);
    setPopupVisible(false);
  };

  const handleClickOutside = (event) => {
    event.preventDefault();
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClose(event);
    }
  };

  useEffect(() => {
    if (popupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupVisible]);

  return (
    <div>
        <button onClick={(event) => {
            event.preventDefault();
            setPopupVisible(true)}}>
        시간대 선택 
        </button>
      {popupVisible && (
        <div className="time-popup" ref={popupRef}>
          <div className="time-popup-content">
            {Object.entries(timesData).map(([key, time]) => (
              <div key={key}>
                <input
                  type="checkbox"
                  name="times"
                  value={time}
                  checked={times.includes(time)}
                  onChange={handleCheckboxChange}
                />
                {time}
              </div>
            ))}
            <br />
            <button onClick={handlePopupClose} className="select-complete">
              선택 완료
            </button>
            <button id="cancel" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelectPage;
