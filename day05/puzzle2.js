const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n");

function hasTwoNonOverlappingLetterPairs(inputString) {
  for (let i = 0; i < inputString.length - 2; i++) {
    if (inputString.indexOf(inputString.substr(i, 2), i + 2) != -1) {
      return true;
    }
  }
  return false;
}

function hasRepeatingLetterWithOneLetterBetween(inputString) {
  for (let i = 0; i < inputString.length - 2; i++) {
    if (inputString.charAt(i) == inputString.charAt(i + 2)) {
      return true;
    }
  }
  return false;
}

let niceStringCount = input
  .filter(hasTwoNonOverlappingLetterPairs)
  .filter(hasRepeatingLetterWithOneLetterBetween).length;

console.log(niceStringCount);
