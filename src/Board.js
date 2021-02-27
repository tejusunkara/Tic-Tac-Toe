//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [xIsNext, setNext] = useState(true);//to check is X is next

  function onClick(boxNumber) {
    
    if( turn <= 8) {
      board[boxNumber] = xIsNext ? "X" : "O";
      setBoard(board);
      setNext(!xIsNext);
    // if (xIsNext) {
    //   board[boxNumber] = "X";
    //   squares[boxNumber] = xIsNext ? "X" : "O";
    //   setBoard(squares);
    //   setNext(!xIsNext);
    // }
    // else {
    //   board[boxNumber] = "O";
    //   squares[boxNumber] = xIsNext ? "X" : "O";
    //   setNext(false);
    // }
    // }
    // if( turn > 8) {
    //   console.log('no more turns');
    }
    
    setTurn(turn+1);
    console.log('board at turn '+turn);
    console.log(board);
    socket.emit('board', { 'board': board, 'xIsNext': xIsNext });
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
      setNext(!data.xIsNext);
    });
  }, []);
  
  const status = 'Next player: '+(xIsNext ? 'X' : 'O');
  return  (
    <div>
      <div class="next">{ status }</div>
      <div class="board">
        
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