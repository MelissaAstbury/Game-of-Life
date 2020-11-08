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
let resolution = 40;
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
}
setUp();
