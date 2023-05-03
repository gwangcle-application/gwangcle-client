import React, { useState } from 'react';
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

const DifficultySelectPage = ( {onDifficultyChange} ) => {
  
    const [difficulty, setDifficulty] = useState('');
    const [radioPopupVisible, setRadioPopupVisible] = useState(false);

    const handleRadioPopupClose = () => {
        setRadioPopupVisible(false);
    };

    const handleRadioSelect = (difficulty) => {
      const selectedDifficulty = difficultyData.find(([key, _]) => key === difficulty);
      onDifficultyChange(selectedDifficulty);
      setRadioPopupVisible(false);
    };

  return (
    <div id="study-registration-div">
      <label>
        난이도
        <button onClick={() => setRadioPopupVisible(true)}> 난이도 선택 </button>
      </label>

      <RadioSelectPage
        show={radioPopupVisible}
        onClose={handleRadioPopupClose}
        options={difficultyOptions}
        selected={difficulty}
        onSelect={handleRadioSelect}
      />
    </div>
  );
};

export default DifficultySelectPage;