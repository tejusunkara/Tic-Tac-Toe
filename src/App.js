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
  const inputRef = useRef(null); //for username input
  const [username, setUsername] = useState(""); //username of current user

  function onClickButton(props) {
    //once user is 'logged in', emit message with user's username & number of users
    if (inputRef != null) {
      const user = inputRef.current.value; //user is set to the input value
      setUsername(user);
      console.log('username is ' + user);
      setUserList(prevList => [...prevList, user]); //updating userList by adding user
      socket.emit('login', { 'userList': userList, 'username': user }); //emitting to the server
    }
    setLogin(true);
    if (isLoggedIn) {
      console.log('logged in onClickButton');
    }
  }

  if (isLoggedIn) {
    console.log(userList);
    console.log('username: '+username);
  }

  useEffect(() => { //getting back user data from server
    socket.on('login', (data) => {
      console.log(data.username+' logged in');
      setUserList(prevList => [...prevList, data.username]);
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
    <Greeting playerLogin={isLoggedIn} username={username} playerX={userList[0]} playerO={userList[1]} spectators={userList.slice(2)}/>
  </div>
  );
}

export default App;