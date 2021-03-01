import React from 'react';
import { Board } from './Board.js';

export function Greeting(props) {
  var player_x = props.playerX;
  var player_o = props.playerO;
  var username = props.username;
  var spectators = props.spectators;

  if (props.playerLogin) {
    return (
      <div className="greeting">
        <div className="tictac">
          <h1>My Tic Tac Toe Board</h1>
          {<Board PlayerX={player_x} PlayerO={player_o} Spectators={spectators} username={username}/>}
        </div>
        <ul>
          Player X: {player_x}
        </ul>
        <ul>
          Player O: {player_o}
        </ul>
        <ul>
          Spectators: {spectators.map(spectator => (
            <li>{spectator}</li>
          ))}
        </ul>
      </div>
    );
  }
  else {
    return (
      <h3></h3>
    );
  }
}