import React from 'react';
import { Board } from './Board.js';
import { Leaderboard } from './Leaderboard.js'

export function LoginDisplay(props) {
  const spectators = props.Spectators;

  if (props.username == props.PlayerX) { //if user is player X
    return (
      <div className="greeting">
        <div className="tictac">
          <h1>My Tic Tac Toe Board</h1>
          {<Board PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username}/>}
        </div>
        <div className="userslist">
          <ul>
            <mark>Player X: {props.PlayerX}</mark>
          </ul>
          <ul>
            Player O: {props.PlayerO}
          </ul>
          <ol>
            Spectators: {spectators.map(spectator => (
              <li>{spectator}</li>
            ))}
          </ol>
        </div>
        <div className="leaderboard">
          <Leaderboard PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username} />
        </div>
      </div>
    );
  }
  else if (props.username == props.PlayerO) { //if user is player X
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
            <mark>Player O: {props.PlayerO}</mark>
          </ul>
          <ol>
            Spectators: {spectators.map(spectator => (
              <li>{spectator}</li>
            ))}
          </ol>
        </div>
        <div className="leaderboard">
          <Leaderboard PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username} />
        </div>
      </div>
    );
  }
  else if (spectators.includes(props.username)) { //if user is a spectator
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
          <ol>
            Spectators: {spectators.map(spectator => (  //if username matches spectator
              (props.username == spectator) ? <li><mark>{spectator}</mark></li> : <li>{spectator}</li>
            ))}
          </ol>
        </div>
        <div className="leaderboard">
          <Leaderboard PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username} />
        </div>
      </div>
    );
  }

  else {
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
          <ol>
            Spectators: {spectators.map(spectator => (
              <li>{spectator}</li>
            ))}
          </ol>
        </div>
        <div className="leaderboard">
          <Leaderboard PlayerX={props.PlayerX} PlayerO={props.PlayerO} Spectators={props.Spectators} username={props.username} />
        </div>
      </div>
    );
  }
}