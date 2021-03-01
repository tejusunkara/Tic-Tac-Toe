//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
// import { Winner } from './Winner.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [xPlays, setPlay] = useState(true); //to check is player X is next; set to true bc X is starting player
  const [gameOver, setGameOver] = useState(false); //if game has reached the end
  var winnerStatus = '';
  var winnerName = '';
  var playerX = '';
  var playerO = '';
  var username = '';

  function onClick(boxNumber) {
    username = props.username; //current user
    playerX = props.PlayerX; //player X
    playerO = props.PlayerO; //player O
    var isUser = (username == playerX || username == playerO);
    // console.log(xPlays ? "X is next" : "O is next");
    // console.log('Current user is ' + username);
    // console.log('user is player X or player O ' + isUser);

    if (isUser && turn < 9) { //if current user is playerX or playerO
      if (xPlays && (username == playerX)) {
        //if next player is X and current user is playerX, print X in cell
        console.log('X plays, username is = playerX');
        board[boxNumber] = "X";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { 'board': board, 'cell': boxNumber, 'xPlays': xPlays, 'turn': turn, 'gameOver': gameOver, 'winnerStatus': winnerStatus }); //emits only is playerX or playerO clicks the board
      }
      else if (!xPlays && (username == playerO)) {
        //if next player is O and current user is playerO, print O in cell
        console.log('O plays, username is = playerO');
        board[boxNumber] = "O";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { 'board': board, 'cell': boxNumber, 'xPlays': xPlays, 'turn': turn, 'gameOver': gameOver, 'winnerStatus': winnerStatus }); //emits only is playerX or playerO clicks the board
      }

      console.log('board at turn ' + turn + ': ' + board);
    }
    else if (!isUser) { //when spectator tries to click
      console.log('user is a spectator => cannot click');
    }
    else if (isUser && turn > 8) { //when players tries to click after turns are over
      console.log('no more turns');
    }

    if (turn == 8) { //once the board is filled, set game to finished
      setGameOver(true);
      console.log(gameOver)
      winnerName = calculateWinner(board);
      winnerStatus = 'Winner is ' + winnerName + '!';
      socket.emit('board', { 'board': board, 'cell': boxNumber, 'xPlays': xPlays, 'turn': turn, 'gameOver': gameOver, 'winnerStatus': winnerStatus });
    }
  }

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

  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Board was clicked');
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      setBoard(data.board);
      setPlay(!data.xPlays);
      setTurn(data.turn + 1);
      winnerStatus = data.winnerStatus;
      if (turn == 8) {
        setGameOver(!data.gameOver);
      }
      console.log(data.xPlays);
      console.log(data.turn);
      console.log(data.winnerStatus);
    });
  }, []);

  const status = 'Next player: ' + (xPlays ? 'X' : 'O');

  return (
    <div>
      <div className="next">{ status }</div>
      <div className="winner">{winnerStatus}</div>
      
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