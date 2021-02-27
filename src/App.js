import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import './Board.css';
import io from 'socket.io-client';

const socket = io();

export function LoggingIn(props) {
  const [user, setUser] = useState('');
  const [userCount, setUserCount] = useState(0);
  
  function onClickButton() {
    //once user is 'logged in', emit message with user's username & number of users
    socket.emit('login', { 'user': user, 'userCount': userCount });
    console.log(user+' is logged in');
    // setUserCount(userCount+1);
    console.log(userCount);
  }
  
    
  // useEffect(() => {
  //   if (isLoggedIn) { 
  //   socket.emit('login', { 'user': user, 'userCount': userCount });
  //   console.log(user+' is logged in');
  //   console.log(userCount);
  //   setUserCount(userCount+1);
  //   setLogin(false);
  //   }
    
  //   return () => {
  //     if(isLoggedIn) {
  //       console.log('log out');
  //       socket.emit('logout', {'user': user})
  //     }
  //   }
  // }, []);
  
  useEffect(() => {
    socket.on('login', (data) => {
      console.log('Login was clicked');
      console.log(data.user);
      setUser(data.user);
      setUserCount(data.userCount + 1);
    });
  }, []);

  return (
    <div class="loggingIn">
      <h1>Please login</h1>
      <label for="username">Username: </label>
      <input type="text" name="username" onChange={e => setUser(e.target.value)}/>
      <button onClick={() => onClickButton()} >Login</button>
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