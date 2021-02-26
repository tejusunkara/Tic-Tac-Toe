import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import './Board.css';
import io from 'socket.io-client';

const socket = io();

export function LoggingIn(props) {
  const [isLoggedIn, setLogin] = useState(false);
  return (
    <button onClick={() => setLogin(true)}>Login</button>
    );
}


function App() {
  return (
    
    <div class="tictac">
      <div class="login">
        <h1>Please login</h1>
        <LoggingIn /> 
      </div>
      <h1>My Tic Tac Toe Board</h1>
      <Board />
    </div>
  );
}

export default App;
