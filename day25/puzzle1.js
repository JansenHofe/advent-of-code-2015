const startNumber = 20151125;
const multiplicator = 252533;
const divisor = 33554393;

function calcNextCode(input) {
  return (input * multiplicator) % divisor;
}

let currentFieldNumber = startNumber;
let currentLevel = 2;
while (true) {
  for (let tableIdx = 0; tableIdx < currentLevel; tableIdx++) {
    let y = currentLevel - tableIdx;
    let x = tableIdx + 1;

    currentFieldNumber = calcNextCode(currentFieldNumber);

    if (y == 3010 && x == 3019) {
      console.log(y + "," + x + ": " + currentFieldNumber);
      break;
    }
  }
  currentLevel++;
}
