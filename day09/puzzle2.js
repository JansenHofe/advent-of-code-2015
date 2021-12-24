const fs = require("fs");

const inputRegex = /^(\w+)\sto\s(\w+)\s=\s(\d+)/;

function getNameIndex(name, nameList) {
  const nameIdx = nameList.indexOf(name);
  if (nameIdx > -1) return nameIdx;
  return nameList.push(name) - 1;
}

function createDistanceMatrix(input) {
  let distMatrix = [];
  let knownNames = [];
  for (let line of input) {
    const regexResult = inputRegex.exec(line);
    let locationIdx1 = getNameIndex(regexResult[1], knownNames);
    let locationIdx2 = getNameIndex(regexResult[2], knownNames);

    if (distMatrix[locationIdx1] == undefined) distMatrix[locationIdx1] = [];
    if (distMatrix[locationIdx2] == undefined) distMatrix[locationIdx2] = [];

    distMatrix[locationIdx1][locationIdx2] = parseInt(regexResult[3]);
    distMatrix[locationIdx2][locationIdx1] = parseInt(regexResult[3]);
  }
  return distMatrix;
}

function generatePermutations(generatedPermutation, currentPermutation, itemsToPermutate) {
  if (itemsToPermutate.length == 0) {
    generatedPermutation.push(currentPermutation);
  } else {
    for (let item of itemsToPermutate) {
      let nextPermutation = [...currentPermutation, item];
      let remainingItems = itemsToPermutate.filter((x) => x !== item);
      generatePermutations(generatedPermutation, nextPermutation, remainingItems);
    }
  }
}

function calculatePathDistance(distanceMatrix, path) {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance += distanceMatrix[path[i]][path[i + 1]];
  }
  return distance;
}

module.exports.getSolution = () => {
  const input = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => x.length > 0);

  const distanceMatrix = createDistanceMatrix(input);
  let locationIndices = Array.from(distanceMatrix.keys());

  let permutations = [];
  generatePermutations(permutations, [], locationIndices);

  let maxDistance = permutations.reduce((max, curr) => {
    const currDist = calculatePathDistance(distanceMatrix, curr);
    return currDist > max ? currDist : max;
  }, 0);

  return maxDistance;
};
