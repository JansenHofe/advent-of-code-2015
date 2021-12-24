const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((line) => line.length > 0);

const inMemoryStrings = [];
let diff = 0;
for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
  inMemoryStrings[lineIndex] = "";
  const line = input[lineIndex];

  for (let i = 1; i < line.length - 1; i++) {
    if (line.charAt(i) == "\\") {
      switch (line.charAt(i + 1)) {
        case "\\":
          inMemoryStrings[lineIndex] += "\\";
          i++;
          break;
        case '"':
          inMemoryStrings[lineIndex] += '"';
          i++;
          break;
        case "x":
          const hexNumberString = "" + line.charAt(i + 2) + line.charAt(i + 3);
          inMemoryStrings[lineIndex] += String.fromCharCode(
            parseInt(hexNumberString, 16)
          );
          i += 3;
          break;
        default:
          break;
      }
    } else {
      inMemoryStrings[lineIndex] += line.charAt(i);
    }
  }

  diff += input[lineIndex].length - inMemoryStrings[lineIndex].length;
}

console.log(diff);
