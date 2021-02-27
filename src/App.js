import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import { Greeting } from './Greeting.js'
import './Board.css';
import io from 'socket.io-client';

const socket = io();

function App(props) {
  const [user, setUser] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [isLoggedIn, setLogin] = useState(false);
  
  function onClickButton(props) {
    //once user is 'logged in', emit message with user's username & number of users
    setLogin(true);
    socket.emit('login', { 'user': user, 'userCount': userCount });
    console.log(user+' is logged in');
    console.log('user count: '+userCount);
  }
  
  
  useEffect(() => {
    socket.on('login', (data) => {
      console.log('Login was clicked');
      console.log('user: '+data.user);
      setUser(data.user);
      setUserCount(data.userCount + 1);
    });
  }, []);
  
  
  console.log('logged in? '+isLoggedIn);
  return (
  <div>
    <div class="loggingIn">
      <h1>Please login</h1>
      <label for="username">Username: </label>
      <input type="text" name="username" onChange={e => setUser(e.target.value)}/>
      <button onClick={() => onClickButton()} >Login</button>
      
    </div>
    <Greeting playerLogin={isLoggedIn}/>
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