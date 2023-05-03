import React, { useState } from 'react';

const timesData = {
    0 : '오전',
    1 : '오후',
    2 : '저녁'
};

const TimeSelectPage = ({ onTimesChange }) => {
    const [times, setTimes] = useState([]);
    
    const handleCheckboxChange = (e) => {
        const updatedTimes = e.target.checked
            ? [...times, e.target.value]
            : times.filter((item) => item !== e.target.value);
        setTimes(updatedTimes);
        onTimesChange(updatedTimes);
    };

    return (
        <>
            {Object.entries(timesData).map(([key, time]) => (
                <div key={key}>
                    <input
                        type="checkbox"
                        name="times"
                        value={time}
                        onChange={handleCheckboxChange}

                    />
                    {time}
                </div>
            ))}
        </>
    );
};

export default TimeSelectPage;
