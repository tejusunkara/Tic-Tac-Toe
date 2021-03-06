//client
import React, { useState, useEffect } from 'react';
import { Box } from './Box.js';
// import { Winner } from './Winner.js';
import io from 'socket.io-client';

const socket = io(); //connect to server app.py

export function Board(props) {

  const [board, setBoard] = useState([null, null, null, null, null, null, null, null]); //initialized as an array with 9 null elements
  // const [turn, setTurn] = useState(0);
  const [xPlays, setPlay] = useState(true); //to check if player X is next; set to true bc X is starting player
  const [gameOver, setGameOver] = useState(false); //if game has reached the end
  const [winnerMessage, setWinnerMessage] = useState('');
  const spectatorList = props.Spectators;
  const playerX = props.PlayerX;
  const playerO = props.PlayerO;
  var username = props.username;

  function onClick(boxNumber) {
    var isPlayer = (username == playerX || username == playerO);
    var boxFilled = (board[boxNumber] == 'X' || board[boxNumber] == 'O');
    console.log('player O in onClick1: ' + playerO);
    console.log('player X in onClick1: ' + playerX);
    const newBoard = [...board];


    if ((newBoard.map(box => box === null)) && (isPlayer) && !boxFilled) { //if there are unmarked boxes and user who clicked is a player and the box that was clicked on isnt filled
      if ((xPlays) && (username == playerX)) { //if next player is X and current user is playerX, print X in cell
        newBoard[boxNumber] = "X";
        // setBoard(board);
        // setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        // setPlay(!xPlays);
        // socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO }); //emits only if playerX clicks the board
      }
      else if ((!xPlays) && (username == playerO)) { //if next player is O and current user is playerO, print O in cell
        newBoard[boxNumber] = "O";
        // setBoard(board);
        // setTurn(turn + 1); //increment turn and set xPlays only when the right player plays
        // setPlay(!xPlays);
        // socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO }); //emits only if playerO clicks the board
      }
      socket.emit('onClickBoard', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });
    }
    // else if ((!(board.map(box => box === null))) && (!calculateWinner(board)) && (isPlayer)) { //if there all boxes are filled and there is no winner
    //   // setGameOver(true);
    //   // setWinnerMessage('No winner :(');
    //   console.log('no winner');
    //   socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: !gameOver, winnerMessage: 'No winner :(', playerX: playerX, playerO: playerO });
    // }
    // if (calculateWinner(board)) { //if there is a winner, get game to finished, set winner name to winner, and emit
    //   // setGameOver(true);
    //   const winner = ((calculateWinner(board) == "X") ? playerX : playerO);
    //   // setWinnerMessage('Winner is ' + winner + '!');
    //   socket.emit('board', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: !gameOver, winnerMessage: 'Winner is ' + winner + '!', playerX: playerX, playerO: playerO });
    // }
    else if ((!(board.map(box => box === null))) || calculateWinner(newBoard)) { //if there is a winner or if the board is full
      if (calculateWinner(newBoard) == 'X') {
        console.log('winner is X');
        winnerMessage = 'Winner is ' + playerX + '!';
      }
      else if (calculateWinner(newBoard) == 'X') {
        console.log('winner is O');
        winnerMessage = 'Winner is ' + playerO + '!';
      }
      else {
        console.log('no winner');
        winnerMessage = 'No winner :(';
      }
      socket.emit('onClickBoard', { updateBoard: newBoard, cell: boxNumber, xPlays: !xPlays, gameOver: !gameOver, winnerMessage: winnerMessage, playerX: playerX, playerO: playerO });
    }
  }

  useEffect(() => { //updating board
    socket.on('onClickBoard', (data) => {
      console.log('Board was clicked');
      setBoard(data.updateBoard);
      // setTurn(data.turn + 1);
      setPlay(data.xPlays);
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
    });
  }, []);

  function onClickRestart() { //When the game ends, Player X and Player O will have the option to click a button to play again
    console.log('play again');
    //set all states to initial values
    const emptyBoard = [null, null, null, null, null, null, null, null];
    // setTurn(0);
    setPlay(true);
    setGameOver(false);
    setWinnerMessage('');
    console.log('clickReplay:')
    console.log(board)
    console.log(xPlays)
    console.log(gameOver)
    console.log(winnerMessage)
    socket.emit('restart', { updateBoard: emptyBoard, cell: null, xPlays: xPlays, gameOver: gameOver, winnerMessage: '', playerX: playerX, playerO: playerO });
  }

  useEffect(() => { //resetting board
    socket.on('restart', (data) => {
      setBoard(data.updateBoard);
      // setTurn(data.turn);
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