import React, { useEffect, useRef, useState } from 'react';
import {
  startingSnake,
  startingFood,
  canvasBounds,
  prev,
  SPEED,
  SCALE,
  score,
  DIRECTIONS,
} from './values';
import { intervalTick } from './intervalTick';

const App = () => {
  const canvasRef = useRef();
  const [apple, setApple] = useState(startingFood);
  const [snake, setSnake] = useState(startingSnake);
  const [speed, setSpeed] = useState(null);
  const [dir, setDir] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);
  intervalTick(() => updateSnake(), speed);

  //randomly generates an apple somewhere on the map
  const generateApple = () =>
    apple.map((_x, i) => Math.floor(Math.random() * (canvasBounds[i] / SCALE)));

  // if apple is eaten, update score, add snake length, and generate new apple
  let appleEaten = (newSnake) => {
    if (newSnake[0][1] === apple[1] && newSnake[0][0] === apple[0]) {
      let newApple = generateApple();
      score += 1;
      console.log('score: ' + score);
      while (checkCollision(newApple, newSnake)) {
        newApple = generateApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  //function where keycode is mapped to arrow keys, with if statement preventing
  //snake from moving left when going right, down while moving up, and vice versa.
  const moveSnake = ({ keyCode }) => {
    if (keyCode >= 37 && keyCode <= 40) {
      if (Math.abs(prev - keyCode) % 2 == 0) {
        console.log('prevented self-collision from behind/front');
      } else if (Math.abs(prev - keyCode) % 2 == 1) {
        setDir(DIRECTIONS[keyCode]);
      }
    }
    prev = keyCode;
  };

  //checks if snake piece moves into itself
  const checkCollision = (piece, snk = snake) => {
    if (piece[0] < 0 || piece[0] * SCALE >= canvasBounds[0] || piece[1] < 0 || piece[1] * SCALE >= canvasBounds[1])
      return true;
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) 
      return true;
    }
    return false;
  };

  //initializes starting conditions
  const startGame = () => {
    setSnake(startingSnake);
    setApple(startingFood);
    setDir([1, 0]);
    setSpeed(SPEED);
    setGameOver(false);
    score = 0;
  };

  //condition when game is over
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  //shifts the snake head forward
  const updateSnake = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newHead);
    if (checkCollision(newHead)) endGame();
    if (!appleEaten(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  //graphic settings for snake and apple objects
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'purple';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'green';
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  //layout
  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      {
        <h4>
          SNAKE (use arrow keys to move)
          <span class="badge badge-secondary">New</span>
        </h4>
      }
      <button class="btn btn-success" id="topBTN" onClick={startGame}>
        Start Game
      </button>
      <canvas
        style={{ border: '1px solid black' }}
        ref={canvasRef}
        width={`${canvasBounds[0]}px`}
        height={`${canvasBounds[1]}px`}
      />
      {(
        <span class="badge rounded-pill bg-info">Score: {score}</span>
      )}
      {gameOver && <span class="badge rounded-pill bg-danger">GAME OVER!</span>}
    </div>
  );
};

export default App;
