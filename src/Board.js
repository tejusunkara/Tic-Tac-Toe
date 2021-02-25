//client
import React from 'react';
import { useState, useEffect } from 'react';
//import { Box } from './Box.js';
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

  return <div class="board">
                
                <div class="box1" onClick={() => onClick(0)}>{ board[0] }</div>
                <div class="box2" onClick={() => onClick(1)}>{ board[1] }</div>
                <div class="box3" onClick={() => onClick(2)}>{ board[2] }</div>
                <div class="box4" onClick={() => onClick(3)}>{ board[3] }</div>
                <div class="box5" onClick={() => onClick(4)}>{ board[4] }</div>
                <div class="box6" onClick={() => onClick(5)}>{ board[5] }</div>
                <div class="box7" onClick={() => onClick(6)}>{ board[6] }</div>
                <div class="box8" onClick={() => onClick(7)}>{ board[7] }</div>
                <div class="box9" onClick={() => onClick(8)}>{ board[8] }</div>
            </div>
}