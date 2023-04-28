import React, { useState, useEffect } from 'react';
import  Axios from 'axios';
import '../css/main.css';

const Table = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/api/boards');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <table id="study-table">
      <thead>
        <tr>
          <th>아이디</th>
          <th>스터디명</th>
          <th>주제</th>
          <th>난이도</th>
          <th>장소</th>
          <th>요일</th>
          <th>시간대</th>
          <th>제한 인원</th>
          <th>기타</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.content}</td>
            <td>{row.difficulty}</td>
            <td>{row.location}</td>
            <td>{row.weeks}</td>
            <td>{row.times}</td>
            <td>{row.capacity}</td>
            <td>{row.mention}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default Table;