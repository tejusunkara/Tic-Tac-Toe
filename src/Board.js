//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
// import { Winner } from './Winner.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [xPlays, setPlay] = useState(true); //to check if player X is next; set to true bc X is starting player
  const [gameOver, setGameOver] = useState(false); //if game has reached the end
  const [winnerMessage, setWinnerMessage] = useState('');
  const spectatorList = props.Spectators;
  const playerX = props.PlayerX;
  const playerO = props.PlayerO;
  var username = props.username;

  function onClick(boxNumber) {
    var isPlayer = (username == playerX || username == playerO);
    console.log('player O in onClick1: ' + playerO);
    console.log('player X in onClick1: ' + playerX);

    if ((isPlayer) && (turn < 9)) {
      if ((xPlays) && (username == playerX)) { //if next player is X and current user is playerX, print X in cell
        board[boxNumber] = "X";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { board: board, cell: boxNumber, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO }); //emits only if playerX clicks the board
      }
      else if ((!xPlays) && (username == playerO)) { //if next player is O and current user is playerO, print O in cell
        board[boxNumber] = "O";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { board: board, cell: boxNumber, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO }); //emits only if playerO clicks the board
      }
      // socket.emit('board', { board: board, cell: boxNumber, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });
    }
    else if ((turn >= 8) && (!calculateWinner(board)) && (isPlayer)) { //if there is no winner
      setGameOver(true);
      setWinnerMessage('No winner :(');
      console.log('no winner');
      socket.emit('board', { board: board, cell: boxNumber, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });
    }

    if (calculateWinner(board)) { //if there is a winner, get game to finished, set winner name to winner, and emit
      setGameOver(true);
      const winner = ((calculateWinner(board) == "X") ? playerX : playerO);
      setWinnerMessage('Winner is ' + winner + '!');
      console.log('HERE in onClick ' + gameOver);
      console.log(winner);
      console.log(winnerMessage);
      socket.emit('board', { board: board, cell: boxNumber, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });
    }
    console.log('board at turn ' + turn + ': ' + board);
    console.log('player O in onClick2: ' + playerO);
    console.log('player X in onClick2: ' + playerX);
  }

  useEffect(() => { //updating board
    socket.on('board', (data) => {
      console.log('Board was clicked');
      setBoard(data.board);
      setTurn(data.turn + 1);
      setPlay(!data.xPlays);
      if (calculateWinner(data.board)) { //if there is a winner, output winner message
        const winner = ((calculateWinner(data.board) == "X") ? data.playerX : data.playerO);
        setWinnerMessage('Winner is ' + winner + '!');
        setGameOver(true);
      }
      else if (data.turn >= 8 && !calculateWinner(data.board)) { //if there is no winner
        setWinnerMessage('No winner :(');
        setGameOver(true);
      }
      else {
        setWinnerMessage(data.winnerMessage);
        setGameOver(data.gameOver);
      }
      console.log(data);
      console.log('player X in useEffect: ' + data.playerX);
      console.log('player O in useEffect: ' + data.playerO);
    });
  }, []);

  function onClickReplay() { //When the game ends, Player X and Player O will have the option to click a button to play again
    console.log('play again');
    //set all states to initial values
    setBoard(['', '', '', '', '', '', '', '', ]);
    setTurn(0);
    setPlay(true);
    setGameOver(false);
    setWinnerMessage('');
    socket.emit('playAgain', { board: board, cell: null, xPlays: xPlays, turn: turn, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });

  }

  useEffect(() => { //resetting board
    socket.on('playAgain', (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setPlay(data.xPlays);
      setWinnerMessage(data.winnerMessage);
      setGameOver(data.gameOver);
      console.log('hello');
      console.log(data);

    });
  }, []);

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const status = 'Next player: ' + (xPlays ? playerX : playerO);

  if (gameOver) { //display once winner is calculated
    console.log(winnerMessage);
    if (username == playerX || username == playerO) { //display play again button for player X and player O
      return (
        <div className="playerMessage">
          <div>{ winnerMessage }</div>
          <button class="replay" onClick={() => onClickReplay()} >Play Again</button>
        </div>
      );
    }
    else {
      return (
        <div className="spectatorMessage">
          { winnerMessage }
          <button class="nextGame" onClick={() => onClickReplay()} >View Next Game</button>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="next">{ status }</div>
      
      <div className="board">
        <Box onClick={() => onClick(0)} board={board[0]}/>
        <Box onClick={() => onClick(1)} board={board[1]}/>
        <Box onClick={() => onClick(2)} board={board[2]}/>
        <Box onClick={() => onClick(3)} board={board[3]}/>
        <Box onClick={() => onClick(4)} board={board[4]}/>
        <Box onClick={() => onClick(5)} board={board[5]}/>
        <Box onClick={() => onClick(6)} board={board[6]}/>
        <Box onClick={() => onClick(7)} board={board[7]}/>
        <Box onClick={() => onClick(8)} board={board[8]}/>
      </div>
      
    </div>

  );
}