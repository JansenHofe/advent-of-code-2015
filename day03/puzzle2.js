const fs = require("fs");

function handleInput(position, inputChar, map) {
  switch (inputChar) {
    case "^":
      position.y++;
      break;
    case "v":
      position.y--;
      break;
    case ">":
      position.x++;
      break;
    case "<":
      position.x--;
      break;
  }

  if (map[position.y] == undefined) {
    map[position.y] = [];
  }
  if (map[position.y][position.x] == undefined) {
    map[position.y][position.x] = 0;
    return 1;
  }

  map[position.y][position.x]++;
  return 0;
}

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" });

  let pos1 = { x: 0, y: 0 };
  let pos2 = { x: 0, y: 0 };

  let houseMap = [];
  houseMap[0] = [];
  houseMap[0][0] = 2;
  let distinctHouses = 1;

  for (let i = 0; i < input.length; i++) {
    distinctHouses += handleInput(i % 2 == 0 ? pos1 : pos2, input.charAt(i), houseMap);
  }
  return distinctHouses;
};
