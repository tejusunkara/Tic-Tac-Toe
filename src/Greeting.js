import React from 'react';
import { LoggingIn } from './App.js';
import { Board } from './Board.js';

export function Greeting(props) {
    if(props.playerLogin) {
      return (
        <UserBoard/>
      );
    } else {
      return (
          <h3></h3>
        );
    }
  }
  
function UserBoard () {
  return (
    <div class="tictac">
      <h1>My Tic Tac Toe Board</h1>
      {<Board/>}
    </div>
  );
}
  