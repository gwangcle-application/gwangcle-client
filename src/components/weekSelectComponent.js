import React, { useState } from 'react';

const weeksData = {
    0 : '월',
    1 : '화',
    2 : '수',
    3 : '목',
    4 : '금',
    5 : '토',
    6 : '일'
};

const WeekSelectPage = ({ onWeeksChange }) => {
    const [weeks, setWeeks] = useState([]);

    const handleCheckboxChange = (e) => {
        const updatedWeeks = e.target.checked
            ? [...weeks, e.target.value]
            : weeks.filter((item) => item !== e.target.value);
        setWeeks(updatedWeeks);
        onWeeksChange(updatedWeeks);
    };

    return (
        <>
            {Object.entries(weeksData).map(([key, week]) => (
                <div key={key}>
                    <input
                        type="checkbox"
                        name="weeks"
                        value={week}
                        onChange={handleCheckboxChange}
                    />
                    {week}
                </div>
            ))}
        </>
    );
};

export default WeekSelectPage;
