import logo from "./logo.svg";
import "./App.css";
import { LoginDisplay } from "./LoginDisplay.js";
import { Leaderboard } from "./Leaderboard.js";
import "./Board.css";
import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

const socket = io();

function App(props) {
  const [userList, setUserList] = useState({ X: "", O: "", Spectators: [] }); //list of users
  const [isLoggedIn, setLogin] = useState(false); //boolean value if user is logged in
  const inputRef = useRef(null); //for username input
  const [username, setUsername] = useState(""); //username of current user

  function onClickLogin(user) {
    //user: user input from the text box
    //once user is 'logged in', emit message with user's username & number of users
    console.log("clicked login");
    const newList = { ...userList };

    if (inputRef != null) {
      user = inputRef.current.value; //user is set to the input value
      if (newList.X == "") {
        console.log("user is X");
        newList.X = user;
      } else if (newList.O == "") {
        console.log("user is O");
        newList.O = user;
      } else {
        console.log("user is a spectator");
        newList.Spectators = [...newList.Spectators, user];
      }
      setUsername(user); //setting current user's username to its client
      socket.emit("login", { newUsers: newList, username: user }); //emitting to the server
    }
    setLogin(true); //not emitted bc only current client is logged it, not the rest
    setUserList({ ...newList });
  }

  var ranks = [];
  var users = [];

  useEffect(() => {
    //getting back user data from server
    socket.on("login", (data) => {
      console.log(data.username + " logged in");
      ranks = [...data.ranks];
      users = [...data.users];
      setUserList(data.newUsers);
      console.log(data);
      console.log(ranks);
      console.log(users);
    });
  }, []);

  if (isLoggedIn) {
    //display once logged in
    return (
      <div>
        <LoginDisplay
          PlayerX={userList.X}
          PlayerO={userList.O}
          Spectators={userList.Spectators}
          username={username}
        />
        <div className="leaderboard">
          <Leaderboard ranks={ranks} players={users} currUser={username} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="loggingIn">
        <h1>Please login</h1>
        <form>
          <label htmlFor="login">Username: </label>
          <input ref={inputRef} type="text" />
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
