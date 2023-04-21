import React, { useState } from 'react';
import './Board.css';


const Table = () => {
  const [data, setData] = useState([
    { id: 1, remaining : '?', classification: '백엔드', difficulty: '중', name: 'CS 스터디', time: '수/금', location: '강남', limited: 4, introduction: '열정 있는 분들 지원 부탁'},
    { id: 2, remaining : '?', classification: '프론트', difficulty: '상', name: '코테 스터디', time: '주말', location: '미정', limited: 1, introduction: '초보자도 상관 없음'}, 
    { id: 3, remaining : '?', classification: '무관', difficulty: '하', name: '자료구조 스터디', time: '월', location: '온라인', limited: 0, introduction: '취준만 가능합니다'},
  ]);

  return (
    <table id="study-table">
      <thead>
        <tr>
          <th>신청</th>
          <th>남은시간</th>
          <th>분류</th>
          <th>난이도</th>
          <th>스터디 이름</th>
          <th>시간</th>
          <th>장소</th>
          <th>제한 인원</th>
          <th>기타</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.remaining}</td>
            <td>{row.classification}</td>
            <td>{row.difficulty}</td>
            <td>{row.name}</td>
            <td>{row.time}</td>
            <td>{row.location}</td>
            <td>{row.limited}</td>
            <td>{row.introduction}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default Table;