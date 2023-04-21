import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Board from './Board';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const board = ReactDOM.createRoot(document.getElementById('study-table'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
board.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);

reportWebVitals();
