const board = document.querySelector(".board");
const blockHeights = 50;
const blockWidths = 50;

const blocks = [];

let direction = "down";
const snake = [
  { x: 1, y: 26},
  { x: 1, y: 27 },
  { x: 1, y:28 },
];

const noOfColumns = Math.floor(board.clientWidth / blockWidths);
const noOfRows = Math.floor(board.clientHeight / blockHeights);

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
    block.innerText = `${row},${col}`;
    blocks[`${row},${col}`] = block;
  }
}

function renderSnake() {
  snake.forEach((segment) => {
    const block = blocks[`${segment.x},${segment.y}`];
    block.classList.add("snake");
  });
}

setInterval(() => {
    let head = null;
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    }else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    snake.forEach((segment) => {
        const block = blocks[`${segment.x},${segment.y}`];
        block.classList.remove("snake");
      });
    snake.unshift(head);
    snake.pop();
  renderSnake();
}, 300);

addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    direction = "left";     
  } else if (e.key === "ArrowRight") {
    direction = "right";
  }

  else if (e.key === "ArrowUp") {
    direction = "up";
  }

  else if (e.key === "ArrowDown") {
    direction = "down";
  }
});

renderSnake();
