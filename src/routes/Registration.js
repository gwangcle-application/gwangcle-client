import { useState } from 'react';
import { Axios as axios } from 'axios';
import '../css/registeration.css';

const weeksData = {
    0 :'월',
    1 : '화',
    2 : '수',
    3 : '목',
    4 : '금',
    5 : '토',
    6 : '일'
}

const timesData = {
    0 :'오전',
    1 : '오후',
    2 : '저녁'
}

const difficultData = {
    0 :'초급',
    1 : '중급',
    2 : '고급'
}

const StudyRegistrationForm = (props) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [location, setLocation] = useState('');
    const [weeks, setWeeks] = useState([]);
    const [times, setTimes] = useState([]);
    const [capacity, setCapacity] = useState('');
    const [announcement, setAnnouncment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            'name':name,
            'content':content,
            'difficulty':difficulty,
            'location':location,
            'weeks':weeks,
            'times':times,
            'capacity':capacity,
            'announcement':announcement
        };
        
        const url = 'http://localhost:8080/api/boards';
        const config = { 'content-type': 'application/json' };
        try {
            const request = await axios.post(url, data, config);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="study-registration-div">    
            <h2>스터디</h2>
            <form className="study-registration-form" onSubmit={handleSubmit}>
            <label>
                스터디명
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                주제
                <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <label>
                난이도
                {Object.entries(difficultData).map(([key, level]) => (
                    <div key={key}>
                    <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    {level}
                    </div>
                ))}
            </label>
            <label>
                위치
                <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
                요일
                {Object.entries(weeksData).map(([key, week]) => (
                <div key={key}>
                    <input
                        type="checkbox"
                        name="weeks"
                        value={week}
                        onChange={(e) =>
                            setWeeks(e.target.checked ? [...weeks, e.target.value] : weeks.filter((item) => item !== e.target.value))
                        }
                    />
                    {week}
                </div>
                ))}
            </label>
            <label>
                시간대
                {Object.entries(timesData).map(([key, time]) => (
                <div key={key}>
                    <input
                        type="checkbox"
                        name="times"
                        value={time}
                        onChange={(e) =>
                            setTimes(e.target.checked ? [...times, e.target.value] : times.filter((item) => item !== e.target.value))
                        }
                    />
                    {time}
                </div>
                ))}
            </label>
            <label>
                제한 인원
                <input type="number" name="limit" value={capacity} min='2' max='10' onChange={(e) => setCapacity(e.target.value)} />
            </label>
            <label>
                알림말
                <input type="text" name="annoucement" value={announcement} onChange={(e) => setAnnouncment(e.target.value)} />
            </label>
            <button type="submit">등록</button>
            </form>
        </div>
    );
  };

export default StudyRegistrationForm;