const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" });

  let floor = 0;
  for (char of input) {
    if (char == "(") floor++;
    else if (char == ")") floor--;
  }
  return floor;
};
