const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split("x"));

let allSurfaces = 0;
for (present of input) {
  let smallestPresentSurface = Infinity;
  for (let dimension = 0; dimension < present.length; dimension++) {
    const surface =
      present[dimension] * present[(dimension + 1) % present.length];

    smallestPresentSurface =
      surface < smallestPresentSurface ? surface : smallestPresentSurface;
    allSurfaces += surface * 2;
  }
  allSurfaces += smallestPresentSurface;
}

console.log(allSurfaces);
