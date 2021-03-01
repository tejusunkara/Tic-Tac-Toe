import logo from './logo.svg';
import './App.css';
import { Board } from './Board.js';
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
      setUserList(prevList => [...prevList, user]); //updating userList by adding user
      socket.emit('login', { userList: userList, username: user }); //emitting to the server
    }
    setLogin(true);
  }

  useEffect(() => { //getting back user data from server
    socket.on('login', (data) => {
      console.log(data.username + ' logged in');
      setUserList(prevList => [...prevList, data.username]);
    });
  }, []);

  if (isLoggedIn) { //display once logged in
    return (
      <div className="greeting">
        <div className="tictac">
          <h1>My Tic Tac Toe Board</h1>
          {<Board PlayerX={userList[0]} PlayerO={userList[1]} Spectators={userList.slice(2)} username={username}/>}
        </div>
        <ul>
          Player X: {userList[0]}
        </ul>
        <ul>
          Player O: {userList[1]}
        </ul>
        <ul>
          Spectators: {userList.slice(2).map(spectator => (
            <li>{spectator}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
    <div className="loggingIn">
      <h1>Please login</h1>
      <label for="username">Username: </label>
      <input ref={inputRef} type="text"  />
      <button className="loginbtn" onClick={() => onClickButton()} >Login</button>
    </div>
    
  </div>
  );
}

export default App;