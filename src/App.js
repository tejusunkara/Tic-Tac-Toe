import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Board } from './Board.js';
import './Board.css';


function App() {
  
  return (
    <div>
      <h1>My Tic Tac Toe Board</h1>
      <Board />
    </div>
  );
}

export default App;
