import React, { useState, useEffect } from 'react';
import  Axios from 'axios';

import '../css/main.css';


const timesData = {
  'EASY' : '입문',
  'MEDIUM' : '기본',
  'HARD' : '심화'
}

const Table = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (id) => {
    await Axios.post(`http://localhost:8080/api/boards/${id}/members/1`);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/api/boards');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isButtonActive = (selectedDate) => {
    const currentTime = new Date();
    const buttonTime = new Date(selectedDate);
    return currentTime >= buttonTime;
  };

  return (
    <div>
      <div>
        <table id="study-table">
          <thead>
            <tr>
              <th></th>
              <th>모집시작 날짜</th>
              <th>모집 여부</th>
              <th>스터디명</th>
              <th>주제</th>
              <th>난이도</th>
              <th>장소</th>
              <th>요일</th>
              <th>시간대</th>
              <th>제한 인원</th>
              <th>현재 인원</th>
              <th>기타</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <button
                    value={row.id}
                    onClick={() => handleClick(row.id)}
                    disabled={!isButtonActive(row.selectedDate)}
                  >
                    신청
                  </button>
                </td>
                <td>{new Date(row.selectedDate).toISOString().slice(0, -11).replace('T', '일 ').replaceAll('-', '. ') + '시 모집 시작'}</td>
                <td>{row.onRecruit ? '모집중' : '모집 완료'}</td>
                <td>{row.name}</td>
                <td>{row.content}</td>
                <td>{timesData[row.difficulty]}</td>
                <td>{row.location}</td>
                <td>{row.weeks.join(', ')}</td>
                <td>{row.times.join(', ')}</td>
                <td>{row.capacity}</td>
                <td>{row.current}</td>
                <td>{row.mention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => handleClick(1)}>테스트</button>
      </div>
    </div>
  );
};


export default Table;