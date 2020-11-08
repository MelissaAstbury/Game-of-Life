let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

function make2DArray(columns, rows) {
  let arr = new Array(columns);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let columns;
let rows;
let resolution = 20;
let width = canvas.width;
let height = canvas.height;

function setUp() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 400, 400);

  columns = width / resolution;
  rows = height / resolution;

  grid = make2DArray(columns, rows);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] === 1) {
        // Draw a rectangle
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, resolution, resolution);
      }
      ctx.strokeStyle = 'red';
      ctx.strokeRect(x, y, resolution, resolution);
    }
  }

  let updated = make2DArray(columns, rows);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Define the edges of the canvas as this does not have all sides
      if (i === 0 || i === columns - 1 || j === 0 || j === rows - 1) {
        updated[i][j] = state;
      } else {
        //Count live neighbours
        let neighbours = countNeighbours(grid, i, j);

        // Currently dead (aka 0) and 3 neighbours are alive
        if (state === 0 && neighbours === 3) {
          updated[i][j] = 1;
        } else if ((state === 1 && neighbours < 2) || neighbours > 3) {
          updated[i][j] = 0;
        } else {
          updated[i][j] = state;
        }
      }
    }
  }

  grid = updated;
  requestAnimationFrame(draw);
}

function countNeighbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[x][y];
  return sum;
}
setUp();
