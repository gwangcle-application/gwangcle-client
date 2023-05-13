import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import '../css/join.css';

const JoinPage = () => {
  const location = useLocation();
  const email = location.state.email;
  const name = location.state.name;
  const [careerLevel, setCareerLevel] = useState('');
  const [jobType, setJobType] = useState('');

  const careerLevels = {
    NONE: '학생 및 취준생',
    JUNIOR: '주니어(1-3년차)',
    MIDDLE: '미들(4-6년차)',
    SENIOR: '시니어(7년차 이상)',
  };
  
  const jobRoles = {
    BACKEND: '백엔드',
    FRONTEND: '프론트엔드',
    MOBILE: '모바일',
    DATA_SCIENTIST: '데이터 사이언티스트',
    PRODUCT_MANGER: '기획자 및 PM',
    PUBLISHER: '퍼블리셔',
    ETC: '미정 및 기타',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      'name':name,
      'email':email,
      'careerLevel':careerLevel,
      'jobType':jobType
    };
    const url = 'http://localhost:8080/api/members';
    const config = { 'content-type': 'application/json' };
    Axios.post(url, data, config, {
      credentials: 'include',
    })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className='join-page'>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <fieldset>
          <legend>Career Level</legend>
          {Object.entries(careerLevels).map(([level, koreanLevel]) => (
            <label key={level}>
              <input
                type="radio"
                value={level}
                checked={careerLevel === level}
                onChange={(e) => setCareerLevel(e.target.value)}
              />
              {koreanLevel}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Job Type</legend>
          {Object.entries(jobRoles).map(([type, koreanType]) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                checked={jobType === type}
                onChange={(e) => setJobType(e.target.value)}
              />
              {koreanType}
            </label>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JoinPage;