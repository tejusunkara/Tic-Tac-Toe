//client
import React from 'react';
import { useState, useEffect } from 'react';
import { Box } from './Box.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);

  function onClick(boxNumber) {
    if( turn <= 8) {
      if (turn % 2 == 0) {
        board[boxNumber] = "X";
      }
      else {
        board[boxNumber] = "O";
      }
    }
    if( turn > 8) {
      console.log('no more turns')
      setBoard(board[" "]);
      
    }
    setBoard(prevBoard => [...board]);
    setTurn(turn+1);

    socket.emit('board', { 'board': board });
  }

  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Board was clicked');
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      setBoard(prevBoard => [...data.board]);
    });
  }, []);

  return  (
    <div class="board">
      
      <Box id="0" onClick={onClick} />
      <Box id="1" onClick={onClick} />
      <Box id="2" onClick={onClick} />
      <Box id="3" onClick={onClick} />
      <Box id="4" onClick={onClick} />
      <Box id="5" onClick={onClick} />
      <Box id="6" onClick={onClick} />
      <Box id="7" onClick={onClick} />
      <Box id="8" onClick={onClick} />
      
    </div>
    );
}

// <div class="box" onClick={() => onClick(0)}>{ board[0] }</div>
//       <div class="box" onClick={() => onClick(1)}>{ board[1] }</div>
//       <div class="box" onClick={() => onClick(2)}>{ board[2] }</div>
//       <div class="box" onClick={() => onClick(3)}>{ board[3] }</div>
//       <div class="box" onClick={() => onClick(4)}>{ board[4] }</div>
//       <div class="box" onClick={() => onClick(5)}>{ board[5] }</div>
//       <div class="box" onClick={() => onClick(6)}>{ board[6] }</div>
//       <div class="box" onClick={() => onClick(7)}>{ board[7] }</div>
//       <div class="box" onClick={() => onClick(8)}>{ board[8] }</div>