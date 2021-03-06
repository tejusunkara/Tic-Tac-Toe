import logo from './logo.svg';
import './App.css';
import { LoginDisplay } from './LoginDisplay.js';
import './Board.css';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';


const socket = io();

function App(props) {
  const [userList, setUserList] = useState({"X": "", "O":"", "Spectators":[]}); //list of users
  const [isLoggedIn, setLogin] = useState(false); //boolean value if user is logged in
  const inputRef = useRef(null); //for username input
  const [username, setUsername] = useState(""); //username of current user

  function onClickLogin(user) { //user: user input from the text box
    //once user is 'logged in', emit message with user's username & number of users
    console.log('clicked login');
    const newList = {...userList};
    console.log(newList);
    
    if (inputRef != null) {
      user = inputRef.current.value; //user is set to the input value
      if(newList.X == "") {
        console.log('user is X');
        newList.X = user;
      }
      else if(newList.O == "") {
        console.log('user is O');
        newList.O = user;
      }
      else {
        console.log('user is a spectator');
        newList.Spectators = ([...newList.Spectators, user]);
      }
      console.log('newList.X: ' + newList.X);
      console.log('newList.O: ' + newList.O);
      console.log('newList.Spectators: ' + newList.Spectators);
      socket.emit('login', { newUsers: newList, username: user, login: !isLoggedIn });  //emitting to the server
    }
    console.log('login = true');
    setLogin(true);
    setUserList({...newList});
  }
  
  useEffect(() => { //getting back user data from server
    socket.on('login', (data) => {
      console.log(data.username + ' logged in');
      setUserList(data.newUsers);
      setUsername(data.username);
      console.log(data);
    });
  }, []);

  if (isLoggedIn) { //display once logged in
    console.log('displaying board');
    console.log(userList);
    return (
      <LoginDisplay PlayerX={userList.X} PlayerO={userList.O} Spectators={userList.Spectators} username={username}/>
    );
  }

  return (
    <div>
      <div className="loggingIn">
        <h1>Please login</h1>
        <form>
          <label for="login">Username: </label>
          <input ref={inputRef} type="text"  />
          <button className="loginbtn" onClick={() => onClickLogin(inputRef)} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;