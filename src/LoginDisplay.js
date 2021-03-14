import React from 'react';
import { PropTypes } from 'prop-types';
import { Board } from './Board';

export function LoginDisplay(props) {
  const { Spectators } = props;
  const { PlayerX } = props;
  const { PlayerO } = props;
  const { username } = props;

  return (
    <div className="greeting">
      <div className="tictac">
        <h1>Tic Tac Toe</h1>
        <Board
          PlayerX={PlayerX}
          PlayerO={PlayerO}
          Spectators={Spectators}
          username={username}
        />
      </div>
      <div className="userslist">
        <ul>
          Player X:
          {PlayerX}
        </ul>
        <ul>
          Player O:
          {PlayerO}
        </ul>
        <ul>
          Spectators:
          {' '}
          {Spectators.map(
            (spectator) => (// if username matches spectator
              <li>{spectator}</li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

LoginDisplay.propTypes = {
  Spectators: PropTypes.arrayOf(PropTypes.string).isRequired,
  PlayerX: PropTypes.string.isRequired,
  PlayerO: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

LoginDisplay.defaultProps = {

};
export default LoginDisplay;
