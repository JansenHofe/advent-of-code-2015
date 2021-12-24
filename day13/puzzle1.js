const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const arrangementRegex = /^(\w+)\swould\s(\w+)\s(\d+)\shappiness\sunits\sby\ssitting\snext\sto\s(\w+)./;

function getPersonIdx(peopleArray, person) {
  let idx = peopleArray.indexOf(person);
  if (idx >= 0) return idx;
  peopleArray.push(person);
  return peopleArray.indexOf(person);
}

function setHappienessMatrix(matrix, idx1, idx2, value) {
  if (matrix[idx1] == undefined) matrix[idx1] = [];
  if (matrix[idx2] == undefined) matrix[idx2] = [];

  if (matrix[idx1][idx2] == undefined) {
    matrix[idx1][idx2] = 0;
    matrix[idx2][idx1] = 0;
  }

  matrix[idx1][idx2] += value;
  matrix[idx2][idx1] += value;
}

function parseInput(arrangements) {
  let people = [];
  let happienessMatrix = [];
  for (let arrangement of arrangements) {
    let regexResult = arrangementRegex.exec(arrangement);
    let happienessValue = parseInt(regexResult[3]);
    if (regexResult[2] == "lose") {
      happienessValue *= -1;
    }
    setHappienessMatrix(
      happienessMatrix,
      getPersonIdx(people, regexResult[1]),
      getPersonIdx(people, regexResult[4]),
      happienessValue
    );
  }

  return { people: people, happienessMatrix: happienessMatrix };
}

function generatePermutationsRecursive(
  generatedPermutations,
  currentPermutation,
  elementsToPermute
) {
  if (elementsToPermute.length > 0) {
    for (let elementToPermute of elementsToPermute) {
      let nextPermutation = [...currentPermutation, elementToPermute];
      let remainingElements = elementsToPermute.filter(
        (x) => x != elementToPermute
      );
      generatePermutationsRecursive(
        generatedPermutations,
        nextPermutation,
        remainingElements
      );
    }
  } else {
    generatedPermutations.push(currentPermutation);
  }
}

function generatePermutations(peopleArray) {
  let generatedPermutations = [];
  generatePermutationsRecursive(
    generatedPermutations,
    [],
    Array.from(peopleArray.keys())
  );
  return generatedPermutations;
}

function calculateHappieness(seatPermutation, happienessMatrix) {
  let happieness = 0;
  for (let i = 0; i < seatPermutation.length - 1; i++) {
    happieness += happienessMatrix[seatPermutation[i]][seatPermutation[i + 1]];
  }
  happieness +=
    happienessMatrix[seatPermutation[0]][
      seatPermutation[seatPermutation.length - 1]
    ];

  return happieness;
}

let parsedInput = parseInput(input);
let seatPermutations = generatePermutations(parsedInput.people);

let maxHappieness = 0;
for (let permutation of seatPermutations) {
  const currHappieness = calculateHappieness(
    permutation,
    parsedInput.happienessMatrix
  );
  maxHappieness =
    currHappieness > maxHappieness ? currHappieness : maxHappieness;
}

console.log(maxHappieness);
