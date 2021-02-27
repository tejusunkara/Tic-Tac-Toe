import React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import './Board.css';
import io from 'socket.io-client';

const socket = io();

export function LoggingIn(props) {
  const [isLoggedIn, setLogin] = useState(false);
  const [user, setUser] = useState('');
  const [userCount, setUserCount] = useState(1);

  const formSubmit = event => {
    event.preventDefault();
  }

  if (isLoggedIn) { //once user is 'logged in', emit message with user's username and number of users
    socket.emit('login', { 'user': user, 'userCount': userCount });
    console.log(user+' is logged in');
    console.log(userCount);
    setLogin(false);
  }

  useEffect(() => {
    socket.on('login', (data) => {
      console.log('Login was clicked');
      console.log(data);
      setUserCount(userCount+1);
      setUser(data.user);
      setUserCount(data.userCount);
    });
  }, []);

  return (
    <div class="login">
      <form onSubmit={formSubmit}>
        <h1>Please login</h1>
        <label for="username">Username: </label>
        <input type="text" name="username" onChange={e => setUser(e.target.value)}/>
        <button onClick={() => setLogin(true)}>Login</button>
      </form>
    </div>

    );
}


function App() {
  
  return (
    <div class="tictac">
      <LoggingIn/>
      <h1>My Tic Tac Toe Board</h1>
      {<Board />}
    </div>
  );
}

export default App;

    // <div class="tictac">
    //   <h1>My Tic Tac Toe Board</h1>
    //   <Board />
    // </div>
  
  // <form >
  //     <button onClick={() => setLogin(true)}>Login</button>
  //   </form>