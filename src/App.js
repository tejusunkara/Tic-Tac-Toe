import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import './Board.css';
import io from 'socket.io-client';

const socket = io();

function App() {
  
  return (
    <div>
      <h1>My Tic Tac Toe Board</h1>
      <Board />
    </div>
  );
}

export default App;
