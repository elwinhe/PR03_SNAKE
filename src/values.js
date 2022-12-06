const startingSnake = [
  [11, 20], [10, 20]
];
var score = 0;
var prev = 39;
const canvasBounds = [600, 600];
const startingFood = [25, 20];
const SPEED = 150;
const SCALE = 15;
const DIRECTIONS = {
  37: [-1, 0], // left
  38: [0, -1], // up
  39: [1, 0], // right
  40: [0, 1] // down
};

export {
  canvasBounds,
  startingSnake,
  startingFood,
  prev,
  score,
  SPEED,
  SCALE,
  DIRECTIONS
};
