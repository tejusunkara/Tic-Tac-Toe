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
  if (isLoggedIn) {
    socket.emit('login', { 'user': 0 });
  }
  return (
    <form >
      <button onClick={() => setLogin(true)}>Login</button>
    </form>
    );
}


function App() {
  const formSubmit = event => {
    event.preventDefault();
    <Board />
  }
  return (
    <div class="login">
      <form onSubmit={formSubmit}>
        <h1>Please login</h1>
        <label for="username">Username: </label>
        <input type="text" name="username" />
        <LoggingIn /> 
      </form>
    </div>
  );
}

export default App;

    // <div class="tictac">
    //   <h1>My Tic Tac Toe Board</h1>
    //   <Board />
    // </div>