const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((line) => line.length > 0);

  const inCodeStrings = [];
  let diff = 0;
  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    inCodeStrings[lineIndex] = '"';
    const line = input[lineIndex];

    for (let i = 0; i < line.length; i++) {
      if (line.charAt(i) == '"') {
        inCodeStrings[lineIndex] += '\\"';
      } else if (line.charAt(i) == "\\") {
        inCodeStrings[lineIndex] += "\\\\";
      } else {
        inCodeStrings[lineIndex] += line.charAt(i);
      }
    }
    inCodeStrings[lineIndex] += '"';

    diff += inCodeStrings[lineIndex].length - input[lineIndex].length;
  }
  return diff;
};
