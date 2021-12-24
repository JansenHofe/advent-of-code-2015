const fs = require("fs");

function isPositionInMatrix(matrix, y, x) {
  return !(matrix[y] == undefined || matrix[y][x] == undefined);
}

function getAdjacentLightsOn(matrix, y, x) {
  let count = 0;
  for (let yAdd = -1; yAdd <= 1; yAdd++) {
    for (let xAdd = -1; xAdd <= 1; xAdd++) {
      const yPos = y + yAdd;
      const xPos = x + xAdd;
      if (
        !(xAdd == 0 && yAdd == 0) &&
        isPositionInMatrix(matrix, yPos, xPos) &&
        matrix[yPos][xPos] == "#"
      ) {
        count++;
      }
    }
  }
  return count;
}

function calcNextMatrix(matrix) {
  let nextMatrix = [];

  for (let y = 0; y < matrix.length; y++) {
    nextMatrix[y] = [];
    for (let x = 0; x < matrix.length; x++) {
      let adjacentLights = getAdjacentLightsOn(matrix, y, x);
      if (matrix[y][x] == "#") {
        if (adjacentLights == 2 || adjacentLights == 3) {
          nextMatrix[y][x] = "#";
        } else {
          nextMatrix[y][x] = ".";
        }
      } else {
        if (adjacentLights == 3) {
          nextMatrix[y][x] = "#";
        } else {
          nextMatrix[y][x] = ".";
        }
      }
    }
  }

  return nextMatrix;
}

module.exports.getSolution = () => {
  const input = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => x.length > 0)
    .map((x) => x.split(""));

  const steps = 100;

  let currMatrix = input;
  for (let i = 0; i < steps; i++) {
    currMatrix = calcNextMatrix(currMatrix);

    currMatrix[0][0] = "#";
    currMatrix[currMatrix.length - 1][0] = "#";
    currMatrix[0][currMatrix.length - 1] = "#";
    currMatrix[currMatrix.length - 1][currMatrix[0].length - 1] = "#";
  }

  const lightCount = currMatrix.reduce(
    (sum, currRow) => sum + currRow.reduce((sum, currCell) => sum + (currCell == "#" ? 1 : 0), 0),
    0
  );

  return lightCount;
};
