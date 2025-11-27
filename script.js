const board = document.querySelector(".board");
const blockHeights = 50;
const blockWidths = 50;
const startButton = document.querySelector(".btn-start");
let interval = null;
const title = document.querySelector("h2");
let score = 0;
let highscore = Number(localStorage.getItem("highscore")) || 0;

let seconds = 0;
let intervalTimer = null;



const highScore = document.querySelector(".highScore");
highScore.innerText = `High Score : ${highscore}`;
const scoreBoard = document.querySelector(".Score");
const timeBoard = document.querySelector(".time");



// START TIMER
function startTimer() {
  if (intervalTimer !== null) return; // prevent multiple timers

  intervalTimer = setInterval(() => {
    seconds++;

    let min = String(Math.floor(seconds / 60)).padStart(2, "0");
    let sec = String(seconds % 60).padStart(2, "0");

    timeBoard.innerText = `Time : ${min}:${sec}`;

    
  }, 1000);
}

// STOP TIMER
function stopTimer() {
  clearInterval(intervalTimer);
  intervalTimer = null;
}

// RESET TIMER
function resetTimer() {
  stopTimer();
  seconds = 0;
  
}



const blocks = [];

let direction = "down";
const snake = [
  { x: 1, y: 26 },
  { x: 1, y: 27 },
  { x: 1, y: 28 },
];

const noOfColumns = Math.floor(board.clientWidth / blockWidths);
const noOfRows = Math.floor(board.clientHeight / blockHeights);
let food = {
  x: Math.floor(Math.random() * noOfRows),
  y: Math.floor(Math.random() * noOfColumns),
};

// for(let i = 0; i < noOfColumns * noOfRows; i++){
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }

for (let row = 0; row < noOfRows; row++) {
  for (let col = 0; col < noOfColumns; col++) {
    const block = document.createElement("div");
    block.classList.add("block");

    board.appendChild(block);
    // block.innerText = `${row},${col}`;
    blocks[`${row},${col}`] = block;
  }
}

function renderSnake() {

  blocks[`${food.x},${food.y}`].classList.add("food");



  let head = null;
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= noOfRows || head.y < 0 || head.y >= noOfColumns) {
    localStorage.setItem("highscore", highscore);

     document.querySelector(".modal").style.display = "flex";
     clearInterval(interval);
      stopTimer();
      
      title.innerText = `Game Over! 🐍 Your score was ${score}`;
      startButton.innerText = "Restart Game";

      startButton.addEventListener("click", () => {
        localStorage.setItem("highscore", highscore);

        location.reload();
      });
     return;  

  }

  if (head.x === food.x && head.y === food.y) {

    score = score + 1;
    scoreBoard.innerText = `Score : ${score}`;
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
    highScore.innerText = `High Score : ${highscore}`;
}

     blocks[`${food.x},${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * noOfRows),
      y: Math.floor(Math.random() * noOfColumns),
    };
    blocks[`${food.x},${food.y}`].classList.add("food");
    snake.unshift(head);
  } else {
    // snake.pop();
  

  } 


  snake.forEach((segment) => {
    const block = blocks[`${segment.x},${segment.y}`];
    block.classList.remove("snake");
  });
  snake.unshift(head);
  snake.pop();


  snake.forEach((segment) => {
    const block = blocks[`${segment.x},${segment.y}`];
    block.classList.add("snake");
  });
}

// interval = setInterval(() => {
  
//   renderSnake();
// }, 300);

addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowRight") {
    direction = "right";
  } else if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  }
});

startButton.addEventListener("click", () => {
  localStorage.setItem("highscore", "value");
  startTimer();

  document.querySelector(".modal").style.display = "none";  
  timeBoard.innerText = "Time : 00:00";
  scoreBoard.innerText = `Score : ${score}`;
  highScore.innerText = `High Score : ${highscore}`;

  interval = setInterval(() => {
    renderSnake();
  }, 300);
});
