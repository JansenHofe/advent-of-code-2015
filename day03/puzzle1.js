const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" });

  let pos = { x: 0, y: 0 };

  let map = [];
  map[0] = [];
  map[0][0] = 1;
  let distinctHouses = 1;

  for (let char of input) {
    switch (char) {
      case "^":
        pos.y++;
        break;
      case "v":
        pos.y--;
        break;
      case ">":
        pos.x++;
        break;
      case "<":
        pos.x--;
        break;
    }

    if (map[pos.y] == undefined) {
      map[pos.y] = [];
    }
    if (map[pos.y][pos.x] == undefined) {
      distinctHouses++;
      map[pos.y][pos.x] = 0;
    }

    map[pos.y][pos.x]++;
  }
  return distinctHouses;
};
