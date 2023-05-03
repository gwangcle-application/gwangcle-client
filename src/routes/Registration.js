import { useState, useEffect } from 'react';
import Axios from 'axios';
import DateSelectComponent from '../components/dateSelectComponent';
import DifficultySelectPage from '../components/difficultySelectComponent';
import WeekSelectPage from '../components/weekSelectComponent';
import TimeSelectPage from '../components/timeSelectComponet';

import '../css/registeration.css';


const StudyRegistrationForm = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [difficulty, setDifficulty] = useState([]);
    const [location, setLocation] = useState('');
    const [weeks, setWeeks] = useState([]);
    const [times, setTimes] = useState([]);
    const [capacity, setCapacity] = useState('');
    const [current, setCurrent] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date(NaN));
    const [mention, setMention] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            'name':name,
            'content':content,
            'difficulty':difficulty[0],
            'location':location,
            'weeks':weeks,
            'times':times,
            'capacity':capacity,
            'current':current,
            'selectedDate':selectedDate, 
            'mention':mention
        };
        console.log(data);
        const url = 'http://localhost:8080/api/boards';
        const config = { 'content-type': 'application/json' };
        try {
            const request = await Axios.post(url, data, config);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

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
                <DifficultySelectPage onDifficultyChange={ (difficulty) => setDifficulty(difficulty) } />
                <div>
                    Selected difficulty: { difficulty[1] }
                </div>
            </label>
            <label>
                위치
                <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
                요일
                <WeekSelectPage onWeeksChange = { (weeks) => setWeeks(weeks) } />
            </label>
            <label>
                시간대
                <TimeSelectPage onTimesChange = { (times) => setTimes(times) } />
            </label>
            <label>
                제한 인원
                <input type="number" name="limit" value={capacity} min='2' max='10' onChange={(e) => setCapacity(e.target.value)} />
            </label>
            <label>
                현재 인원
                <input type="number" name="current" value={capacity} min='1' max='10' onChange={(e) => setCurrent(e.target.value)} />
            </label>
            <label>
                스터디 모집 날짜
                <DateSelectComponent onDateChange={ (newDate) => {
                    const selected = new Date(newDate.year, newDate.month-1, newDate.day, newDate.time);
                    setSelectedDate(selected);
                }} />
                <br />
                <div>
                    Selected Date: {
                        isNaN(selectedDate.getTime())
                        ? 'Not selected'
                        : `${selectedDate.toLocaleDateString()}일 ${selectedDate.getHours()}시 모집 시작`
                    }
                </div>
            </label>
            <label>
                알림말
                <input type="text" name="mention" value={mention} onChange={(e) => setMention(e.target.value)} />
            </label>
            <button type="submit">등록</button>
            </form>
        </div>
    );
  };

export default StudyRegistrationForm;
