const startNumber = 20151125;
const multiplicator = 252533;
const divisor = 33554393;

function calcNextCode(input) {
  return (input * multiplicator) % divisor;
}

let currentFieldNumber = startNumber;
let currentLevel = 2;
let searchedFieldNumber = -1;
while (searchedFieldNumber == -1) {
  for (let tableIdx = 0; tableIdx < currentLevel; tableIdx++) {
    let y = currentLevel - tableIdx;
    let x = tableIdx + 1;

    currentFieldNumber = calcNextCode(currentFieldNumber);

    if (y == 3010 && x == 3019) {
      searchedFieldNumber = currentFieldNumber;
      break;
    }
  }
  currentLevel++;
}

console.log(searchedFieldNumber);
