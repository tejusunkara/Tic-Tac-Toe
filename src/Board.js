//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
import { App } from './App.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [xPlays, setPlay] = useState(true); //to check is player X is next; set to true bc X is starting player
  var playerX = '';
  var playerO = '';
  var username = '';

  function onClick(boxNumber) {
    username = props.username; //current user
    playerX = props.PlayerX; //player X
    playerO = props.PlayerO; //player O

    console.log(xPlays ? "X is next" : "O is next");
    console.log('Current user is ' + username);
    var isUser = (username == playerX || username == playerO);
    console.log('user is player X or player O ' + isUser);

    if (isUser && turn <= 8) { //if current user is playerX or playerO
      if (xPlays && (username == playerX)) {
        //if next player is X and current user is playerX, print X in cell
        console.log('X plays, username is = playerX');
        board[boxNumber] = "X";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { 'board': board, 'cell': boxNumber, 'xPlays': xPlays, 'turn': turn }); //emits only is playerX or playerO clicks the board
      }
      else if (!xPlays && (username == playerO)) {
        //if next player is O and current user is playerO, print O in cell
        console.log('O plays, username is = playerO');
        board[boxNumber] = "O";
        setBoard(board);
        setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        setPlay(!xPlays);
        socket.emit('board', { 'board': board, 'cell': boxNumber, 'xPlays': xPlays, 'turn': turn }); //emits only is playerX or playerO clicks the board
      }

      console.log('board at turn ' + turn + ': ' + board);
    }
    else {
      console.log('board at turn ' + turn + ': ' + board);
      console.log('user is a spectator => cannot click');
    }
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
      console.log(data.xPlays);
      setTurn(data.turn + 1);
      console.log(data.turn);
    });
  }, []);

  const status = 'Next player: ' + (xPlays ? 'X' : 'O');

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