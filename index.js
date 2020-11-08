function make2DArray(columns, rows) {
  let arr = new Array(columns);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let columns = 10;
let rows = 10;

function setUp() {
  grid = make2DArray(columns, rows);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.round(Math.random(2));
    }
  }
}

setUp();
console.table(grid);
