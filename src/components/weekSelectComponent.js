import React, { useState, useRef, useEffect } from 'react';

import '../css/week.css';

const weekOrder = { "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6, "일": 7 };
const weeksData = {
  0: '월',
  1: '화',
  2: '수',
  3: '목',
  4: '금',
  5: '토',
  6: '일',
};

const WeekSelectPage = ({ onWeeksChange }) => {
  const [weeks, setWeeks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef();

  const handleCheckboxChange = (e) => {
    const checkedWeek = e.target.value;
    if (e.target.checked) {
      if (!weeks.includes(checkedWeek)) {
        setWeeks((prevState) => [...prevState, checkedWeek]);
      }
    } else {
      setWeeks((prevState) => prevState.filter((week) => week !== checkedWeek));
    }
  };

  const handlePopupClose = (event) => {
    event.preventDefault();
    const sortedWeeks = weeks.sort((a, b) => weekOrder[a] - weekOrder[b]);
    onWeeksChange(sortedWeeks);
    setPopupVisible(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setWeeks([]);
    onWeeksChange([]);
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
        setPopupVisible(true);
      }}>
        요일 선택
      </button>
      {popupVisible && (
        <div className="week-popup" ref={popupRef}>
          <div className="week-popup-content">
            {Object.entries(weeksData).map(([key, week]) => (
              <div key={key}>
                <input
                  type="checkbox"
                  name="weeks"
                  value={week}
                  checked={weeks.includes(week)}
                  onChange={handleCheckboxChange}
                />
                {week}
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

export default WeekSelectPage;
