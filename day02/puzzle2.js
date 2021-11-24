const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split("x"));

let allRibbons = 0;
for (present of input) {
  let smallestPerimeter = Infinity;
  let volume = 1;
  for (let dimension = 0; dimension < present.length; dimension++) {
    const perimeter =
      present[dimension] * 2 + present[(dimension + 1) % present.length] * 2;
    smallestPerimeter =
      perimeter < smallestPerimeter ? perimeter : smallestPerimeter;

    volume *= present[dimension];
  }
  allRibbons += smallestPerimeter + volume;
}

console.log(allRibbons);
