const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n");

function hasSameLetterTwiceInARow(inputString) {
  let lastChar = "";
  for (char of inputString) {
    if (lastChar == char) return true;
    lastChar = char;
  }
  return false;
}

function hasAtLeastThreeVowels(inputString) {
  let vowelCount = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  for (char of inputString) {
    if (vowels.includes(char)) vowelCount++;
  }
  return vowelCount >= 3;
}

function doesNotContainIllegalString(inputString) {
  const illegalStrings = ["ab", "cd", "pq", "xy"];
  for (illegalString of illegalStrings) {
    if (inputString.includes(illegalString)) return false;
  }
  return true;
}

let niceStringCount = input
  .filter(doesNotContainIllegalString)
  .filter(hasAtLeastThreeVowels)
  .filter(hasSameLetterTwiceInARow).length;

console.log(niceStringCount);
