import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({ isNext, handlePlay, value }) {
  function handlechange(i) {
    if (calculateWinner(value) || value[i]) {
      return;
    }

    const nextSquares = value.slice();
    nextSquares[i] = isNext ? "X" : "O";
    handlePlay(nextSquares);
  }
  const winner = calculateWinner(value);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (isNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={value[0]} onSquareClick={() => handlechange(0)} />
        <Square value={value[1]} onSquareClick={() => handlechange(1)} />
        <Square value={value[2]} onSquareClick={() => handlechange(2)} />
      </div>
      <div className="board-row">
        <Square value={value[3]} onSquareClick={() => handlechange(3)} />
        <Square value={value[4]} onSquareClick={() => handlechange(4)} />
        <Square value={value[5]} onSquareClick={() => handlechange(5)} />
      </div>
      <div className="board-row">
        <Square value={value[6]} onSquareClick={() => handlechange(6)} />
        <Square value={value[7]} onSquareClick={() => handlechange(7)} />
        <Square value={value[8]} onSquareClick={() => handlechange(8)} />
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const correntArray = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {description}{" "}
        </button>
      </li>
    );
  });
  function jumpTo(move) {
    setCurrentMove(move);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isXNext} value={correntArray} handlePlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
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
