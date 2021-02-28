import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
import { Greeting } from './Greeting.js'
import './Board.css';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';


const socket = io();

function App(props) {
  const [userList, setUserList] = useState([]); //list of users
  const [isLoggedIn, setLogin] = useState(false); //boolean value if user is logged in
  const inputRef = useRef(null);  //for username input
  
  function onClickButton(props) {
    //once user is 'logged in', emit message with user's username & number of users
    if (inputRef != null) {
      const username = inputRef.current.value;  //username is set to the input value
      console.log('username: '+username);
      setUserList(prevList => [...prevList, username]); //updating userList and adding username 
      console.log('user list: '+userList);
      socket.emit('login', { 'userList': userList, 'username': username }); //emitting to the server
    }
    setLogin(true);
  }
  
  console.log(userList);
  
  useEffect(() => {//getting back user data from server
    socket.on('login', (data) => {
      console.log('data from server: '+data);
      setUserList(prevList => [...prevList, data.username])
    });
  }, []);
  
  return (
  <div>
    <div class="loggingIn">
      <h1>Please login</h1>
      <label for="username">Username: </label>
      <input ref={inputRef} type="text"  />
      <button class="loginbtn" onClick={() => onClickButton()} >Login</button>
    </div>
    <Greeting playerLogin={isLoggedIn} playerX={userList[0]} playerO={userList[1]} spectators={userList.slice(2)}/>
  </div>
  );
}

export default App;