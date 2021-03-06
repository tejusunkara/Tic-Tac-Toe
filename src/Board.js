//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
// import { Winner } from './Winner.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([null, null, null, null, null, null, null, null]); //initialized as an array with 9 null elements
  const [xPlaysNext, setPlaysNext] = useState(true); //to check if player X is next; set to true bc X is starting player
  const [gameOver, setGameOver] = useState(false); //if game has reached the end
  const [winnerMessage, setWinnerMessage] = useState('');
  const playerX = props.PlayerX;
  const playerO = props.PlayerO;
  var username = props.username;

  function upgradeBoard(boxNumber) {
    var isPlayer = (username == playerX || username == playerO);
    const newBoard = [...board];
    var boxFilled = (newBoard[boxNumber] == 'X' || newBoard[boxNumber] == 'O');

    if (newBoard.includes(null) && (isPlayer) && (!boxFilled)) { //if there are unmarked boxes and user who clicked is a player and the box that was clicked on isnt filled
      console.log('open boxes, isplayer, and box not filled');
      if ((xPlaysNext) && (username == playerX)) { //if next player is X and current user clicking is playerX, print X in cell
        newBoard[boxNumber] = "X";
        console.log('X');
        setPlaysNext(!xPlaysNext); //only switch players if the correct player clicks on the board
        socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlaysNext: !xPlaysNext, gameOver: gameOver, winnerMessage: winnerMessage }); //emits only if playerX clicks the board
      }
      else if ((!xPlaysNext) && (username == playerO)) { //if next player is O and current user is playerO, print O in cell
        newBoard[boxNumber] = "O";
        console.log('O');
        setPlaysNext(!xPlaysNext);
        socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlaysNext: !xPlaysNext, gameOver: gameOver, winnerMessage: winnerMessage }); //emits only if playerO clicks the board
      }
      setBoard(newBoard);
      console.log('fill in board');
    }
    if (!newBoard.includes(null) || calculateWinner(newBoard)) { //if there is a winner or if the board is full
      var winner;
      if (calculateWinner(newBoard) == 'X') {
        console.log('winner is X');
        winner = 'Winner is ' + playerX + '!';
      }
      else if (calculateWinner(newBoard) == 'O') {
        console.log('winner is O');
        winner = 'Winner is ' + playerO + '!';
      }
      else {
        console.log('no winner');
        winner = 'No winner :(';
      }
      setGameOver(true);
      setWinnerMessage(winner);
      socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlaysNext: xPlaysNext, gameOver: !gameOver, winnerMessage: winner });
    }
  }

  useEffect(() => { //updating board
    socket.on('board', (data) => {
      console.log('Board was clicked');
      setBoard(data.updateBoard);
      setPlaysNext(data.xPlaysNext);
      setGameOver(data.gameOver);
      setWinnerMessage(data.winnerMessage);
      console.log(data);
    });
  }, []);

  function onClickRestart() { //When the game ends, Player X and Player O will have the option to click a button to play again
    console.log('play again');
    //set all states to initial values
    const emptyBoard = [null, null, null, null, null, null, null, null];
    setBoard(emptyBoard);
    setPlaysNext(true);
    setGameOver(false);
    setWinnerMessage('');
    console.log('clickReplay:');
    console.log(board);
    console.log(xPlaysNext);
    console.log(gameOver);
    console.log(winnerMessage);
    socket.emit('restart', { updateBoard: emptyBoard, cell: null, xPlaysNext: true, gameOver: false, winnerMessage: '' });
  }

  useEffect(() => { //resetting board
    socket.on('restart', (data) => {
      console.log('restart');
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

  if (gameOver) { //display once winner is calculated
    console.log(winnerMessage);
    if (username == playerX || username == playerO) { //display play again button for player X and player O
      return (
        <div className="playerMessage">
          <div>{ winnerMessage }</div>
          <button class="replay" onClick={() => onClickRestart()} >Restart</button>
        </div>
      );
    }
    else {
      return (
        <div className="spectatorMessage">
          <div>{ winnerMessage }</div>
        </div>
      );
    }
  }

  const status = 'Next player: ' + (xPlaysNext ? playerX : playerO);

  return (
    <div>
      <div className="next">{ status }</div>
      
      <div className="board">
        <Box onClick={() => upgradeBoard(0)} board={board[0]}/>
        <Box onClick={() => upgradeBoard(1)} board={board[1]}/>
        <Box onClick={() => upgradeBoard(2)} board={board[2]}/>
        <Box onClick={() => upgradeBoard(3)} board={board[3]}/>
        <Box onClick={() => upgradeBoard(4)} board={board[4]}/>
        <Box onClick={() => upgradeBoard(5)} board={board[5]}/>
        <Box onClick={() => upgradeBoard(6)} board={board[6]}/>
        <Box onClick={() => upgradeBoard(7)} board={board[7]}/>
        <Box onClick={() => upgradeBoard(8)} board={board[8]}/>
      </div>
      
    </div>

  );
}