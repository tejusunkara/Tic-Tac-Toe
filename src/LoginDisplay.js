import React from 'react';
import { Board } from './Board.js';

export function LoginDisplay(props) {
  const spectators = props.Spectators;

  return (
    <div className="greeting">
      <div className="tictac">
        <h1>My Tic Tac Toe Board</h1>
        {<Board PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username}/>}
      </div>
      <div className="userslist">
        <ul>
          Player X: {props.PlayerX}
        </ul>
        <ul>
          Player O: {props.PlayerO}
        </ul>
        <ul>
          Spectators: {spectators.map(spectator => (  //if username matches spectator
            <li>{spectator}</li>
          ))}
        </ul>
      </div>
    </div>
  );

}