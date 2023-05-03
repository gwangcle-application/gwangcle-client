import React, { useState, useEffect, useRef } from 'react';
import RadioSelectPage from './radioComponent';

import '../css/difficulty.css';

const difficultyData = [
    ['EASY', '입문'],
    ['MEDIUM', '기본'],
    ['HARD', '심화']
];

const difficultyOptions = [
  [1, '입문', 'EASY'],
  [2, '기본', 'MEDIUM'],
  [3, '심화', 'HARD']
];

const DifficultySelectPage = ( { onDifficultyChange } ) => {
    
    const [difficulty, setDifficulty] = useState('');
    const [radioPopupVisible, setRadioPopupVisible] = useState(false);
    const popupRef = useRef();

    const handleRadioSelect = (difficulty) => {
      const selectedDifficulty = difficultyData.find(([key, _]) => key === difficulty);
      setDifficulty(difficulty);
      onDifficultyChange(selectedDifficulty);
      setRadioPopupVisible(false);
    };

    const handleCancel = (event) => {
      event.preventDefault();
      onDifficultyChange('');
      setDifficulty('');
      setRadioPopupVisible(false);
    };

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleCancel(event);
      }
    };

    useEffect(() => {
      if (radioPopupVisible) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [radioPopupVisible]);

  return (
    <div id="study-registration-div">
      <label>
        <button onClick={(event) => {
          event.preventDefault();
          setRadioPopupVisible(true)}}>
             난이도 선택 
        </button>
      </label>

      <RadioSelectPage
        ref={popupRef}
        show={radioPopupVisible}
        onCancel={handleCancel}
        options={difficultyOptions}
        selected={difficulty}
        onSelect={handleRadioSelect}
      />
    </div>
  );
};

export default DifficultySelectPage;