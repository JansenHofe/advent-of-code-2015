const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" }).split("\n");

  const instructionRegex = /^(\D+)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)/;
  const gridSize = 1000;

  let grid = [];
  for (let y = 0; y < gridSize; y++) {
    grid[y] = [];
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = 0;
    }
  }

  for (instruction of input) {
    const result = instructionRegex.exec(instruction);
    if (result) {
      let handleFunc;
      switch (result[1]) {
        case "turn on":
          handleFunc = (grid, y, x) => {
            grid[y][x]++;
          };
          break;
        case "turn off":
          handleFunc = (grid, y, x) => {
            if (grid[y][x] >= 1) {
              grid[y][x]--;
            }
          };
          break;
        case "toggle":
          handleFunc = (grid, y, x) => {
            grid[y][x] += 2;
          };
          break;
      }

      const xStart = parseInt(result[2]);
      const xEnd = parseInt(result[4]);
      const yStart = parseInt(result[3]);
      const yEnd = parseInt(result[5]);

      for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
          handleFunc(grid, y, x);
        }
      }
    }
  }

  let brightness = 0;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      brightness += grid[y][x];
    }
  }
  return brightness;
};
