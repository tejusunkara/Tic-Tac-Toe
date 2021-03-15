// client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { PropTypes } from 'prop-types';
import { Box } from './Box';

const socket = io(); // connect to server app.py

export function Board(props) {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]); // initialized as an array with 9 null elements
  // to check if player X is next; set to true bc X is starting player
  const [xPlaysNext, setPlaysNext] = useState(true);
  const [gameOver, setGameOver] = useState(false); // if game has reached the end
  const [winnerMessage, setWinnerMessage] = useState('');
  const { PlayerX } = props;
  const { PlayerO } = props;
  const { username } = props;

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function updateBoard(boxNumber) {
    const isPlayer = username === PlayerX || username === PlayerO;
    const newBoard = [...board];
    const boxFilled = newBoard[boxNumber] === 'X' || newBoard[boxNumber] === 'O';

    if (newBoard.includes(null) && isPlayer && !boxFilled) {
      // if there are unmarked boxes and user who clicked is a player and the box that was clicked
      // on isnt filled
      if (xPlaysNext && username === PlayerX) {
        // if next player is X and current user clicking is PlayerX, print X in cell
        newBoard[boxNumber] = 'X';
        setPlaysNext(!xPlaysNext); // only switch players if the correct player clicks on the board
        socket.emit('board', {
          updateBoard: newBoard,
          cell: boxNumber,
          xPlaysNext: !xPlaysNext,
          gameOver,
          winnerMessage,
        }); // emits only if PlayerX clicks the board
      } else if (!xPlaysNext && username === PlayerO) {
        // if next player is O and current user is PlayerO, print O in cell
        newBoard[boxNumber] = 'O';
        setPlaysNext(!xPlaysNext);
        socket.emit('board', {
          updateBoard: newBoard,
          cell: boxNumber,
          xPlaysNext: !xPlaysNext,
          gameOver,
          winnerMessage,
        }); // emits only if PlayerO clicks the board
      }
      setBoard(newBoard);
    }
    if (!newBoard.includes(null) || calculateWinner(newBoard)) {
      // if there is a winner or if the board is full
      let winner;
      let result = '';
      let loser = '';
      if (calculateWinner(newBoard) === 'X') {
        winner = `Winner is ${PlayerX}!`;
        result = PlayerX;
        loser = PlayerO;
      } else if (calculateWinner(newBoard) === 'O') {
        winner = `Winner is ${PlayerO}!`;
        result = PlayerO;
        loser = PlayerX;
      } else {
        winner = 'No winner :(';
        result = 'draw';
      }
      setGameOver(true);
      setWinnerMessage(winner);
      socket.emit('winner', { winner: result, loser }); // emit an event telling the server whether that client’s username won or lost
      socket.emit('board', {
        updateBoard: newBoard,
        cell: boxNumber,
        xPlaysNext,
        gameOver: !gameOver,
        winnerMessage: winner,
      });
    }
  }

  useEffect(() => {
    // updating board
    socket.on('board', (data) => {
      console.log('Board was clicked');
      setBoard(data.updateBoard);
      setPlaysNext(data.xPlaysNext);
      setGameOver(data.gameOver);
      setWinnerMessage(data.winnerMessage);
    });
  }, []);

  function onClickRestart() {
    // When the game ends, Player X and Player O will have the option to click a
    // button to play again
    // set all states to initial values
    const emptyBoard = [null, null, null, null, null, null, null, null];
    setBoard(emptyBoard);
    setPlaysNext(true);
    setGameOver(false);
    setWinnerMessage('');
    socket.emit('restart', {
      updateBoard: emptyBoard,
      cell: null,
      xPlaysNext: true,
      gameOver: false,
      winnerMessage: '',
    });
  }

  useEffect(() => {
    // resetting board
    socket.on('restart', (data) => {
      console.log('restart');
      console.log(data);
    });
  }, []);

  if (gameOver) {
    // display once winner is calculated
    if (username === PlayerX || username === PlayerO) {
      // display play again button for player X and player O
      return (
        <div className="playerMessage">
          <div>{winnerMessage}</div>
          <button className="replay" type="submit" onClick={() => onClickRestart()}>
            Restart
          </button>
        </div>
      );
    }
    return (
      <div className="spectatorMessage">
        <div>{winnerMessage}</div>
      </div>
    );
  }

  const status = `Next player: ${(xPlaysNext ? PlayerX : PlayerO)}`;

  return (
    <div>
      <div className="next">{status}</div>

      <div className="board">
        <Box onClick={() => updateBoard(0)} board={board[0]} />
        <Box onClick={() => updateBoard(1)} board={board[1]} />
        <Box onClick={() => updateBoard(2)} board={board[2]} />
        <Box onClick={() => updateBoard(3)} board={board[3]} />
        <Box onClick={() => updateBoard(4)} board={board[4]} />
        <Box onClick={() => updateBoard(5)} board={board[5]} />
        <Box onClick={() => updateBoard(6)} board={board[6]} />
        <Box onClick={() => updateBoard(7)} board={board[7]} />
        <Box onClick={() => updateBoard(8)} board={board[8]} />
      </div>
    </div>
  );
}

Board.propTypes = {
  PlayerX: PropTypes.string.isRequired,
  PlayerO: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
export default Board;
