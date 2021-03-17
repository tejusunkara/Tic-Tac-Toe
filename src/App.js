/* eslint-disable no-unused-expressions */
import io from 'socket.io-client';
import './Board.css';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { LoginDisplay } from './LoginDisplay';
import { Leaderboard } from './Leaderboard';

const socket = io();

function App() {
  const [userList, setUserList] = useState({ X: '', O: '', Spectators: [] }); // list of users
  const [isLoggedIn, setLogin] = useState(false); // boolean value if user is logged in
  const inputRef = useRef(null); // for username input
  const [username, setUsername] = useState(''); // username of current user
  const [ranks, setRanks] = useState([]);
  const [users, setUsers] = useState([]);

  function onClickLogin(user) {
    // user: user input from the text box
    // once user is 'logged in', emit message with user's username & number of users
    // console.log('clicked login');
    const newList = { ...userList };

    if (inputRef != null) {
      let loginUser = user;
      loginUser = inputRef.current.value; // user is set to the input value
      if (newList.X === '') {
        // console.log('user is X');
        newList.X = loginUser;
      } else if (newList.O === '') {
        // console.log('user is O');
        newList.O = loginUser;
      } else {
        // console.log('user is a spectator');
        newList.Spectators = [...newList.Spectators, loginUser];
      }
      setUsername(loginUser); // setting current user's username to its client
      socket.emit('login', { newUsers: newList, username: loginUser }); // emitting to the server
    }
    setLogin(true); // not emitted bc only current client is logged it, not the rest
    setUserList({ ...newList });
  }

  useEffect(() => {
    // getting back user data from server
    socket.on('login', (data) => {
      // console.log(data.username);
      // console.log('logged in');
      setUserList(data.newUsers);
      setRanks[data.ranks];
      setUsers[data.users];
      // console.log(data);
      // console.log(ranks);
      // console.log(users);
    });
  }, []);

  if (isLoggedIn) {
    // display once logged in
    return (
      <div>
        <LoginDisplay
          PlayerX={userList.X}
          PlayerO={userList.O}
          Spectators={userList.Spectators}
          username={username}
          socketio={socket}
        />
        <div className="leaderboard">
          <Leaderboard
            ranks={ranks}
            players={users}
            currUser={username}
            socket={socket}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="loggingIn">
        <h1>Please login</h1>
        <form>
          <label htmlFor="login">
            Username:
            <input ref={inputRef} type="text" />
          </label>
          <button
            className="loginbtn"
            onClick={() => onClickLogin(inputRef)}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
