import React from 'react';
import { Board } from './Board.js';

export function Greeting(props) {
    if(props.playerLogin) {
      return (
        <div>
          <UserBoard/>
          <ul>
            Player X: {props.playerX}
          </ul>
          <ul>
            Player O: {props.playerO}
          </ul>
          <ul>
            Spectators: {props.spectators.map(spectator => (
              <li>{props.spectators}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
          <h3></h3>
        );
    }
  }
  
function UserBoard () {
  return (
    <div className="tictac">
      <h1>My Tic Tac Toe Board</h1>
      {<Board/>}
    </div>
  );
}
  