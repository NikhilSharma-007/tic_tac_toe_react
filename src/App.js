import "./App.css";
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveHistory, setMoveHistory] = useState([]);
  const [orderAscending, setOrderAscending] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const newMoveHistory = [
      ...moveHistory,
      { index, move: `(${Math.floor(index / 3)}, ${index % 3})` },
    ];
    setMoveHistory(newMoveHistory);

    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);

    setXIsNext(!xIsNext);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }

    return null;
  };

  const toggleOrderAscending = () => {
    setOrderAscending(!orderAscending);
  };

  const renderSquare = (index) => {
    const isHighlighted = winner && winner.line.includes(index);
    return (
      <button
        className={`square ${isHighlighted ? "highlighted" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        row.push(renderSquare(index));
      }
      rows.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return rows;
  };

  const renderMoveHistory = () => {
    const sortedMoves = orderAscending
      ? moveHistory
      : [...moveHistory].reverse();
    return sortedMoves.map((move, index) => (
      <li key={index}>
        {index === moveHistory.length - 1 ? (
          <span>You are at move #{index + 1}</span>
        ) : (
          <button onClick={() => handleClick(move.index)}>{`Move #${
            index + 1
          }: ${move.move}`}</button>
        )}
      </li>
    ));
  };

  return (
    <div className="game">
      <div className="game-board">{renderBoard()}</div>
      <div className="game-info">
        <button onClick={toggleOrderAscending}>
          {orderAscending ? "Descending Order" : "Ascending Order"}
        </button>
        <ol>{renderMoveHistory()}</ol>
        {winner ? (
          <div>Winner: {winner.winner}</div>
        ) : board.every((value) => value !== null) ? (
          <div>Draw</div>
        ) : null}
      </div>
    </div>
  );
};

export default TicTacToe;
