const fs = require("fs");

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

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" }).split("\n");

  return input
    .filter(hasTwoNonOverlappingLetterPairs)
    .filter(hasRepeatingLetterWithOneLetterBetween).length;
};
