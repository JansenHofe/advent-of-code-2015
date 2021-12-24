const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0)
  .map((x) => parseInt(x));

const destinationVolume = 150;

function getContainerCombinations(containers, destinationValue) {
  let generatedPermutations = [];
  getContainerCombinationsRecursive(
    generatedPermutations,
    [],
    containers,
    destinationValue
  );
  return generatedPermutations;
}

function getContainerCombinationsRecursive(
  generatedPermutations,
  currentPermutation,
  elementsToPermute,
  destinationValue
) {
  const currVolume = currentPermutation.reduce((sum, curr) => sum + curr, 0);

  if (currVolume == destinationValue) {
    generatedPermutations.push(currentPermutation);
  } else if (currVolume > destinationValue) {
    return;
  } else {
    for (let i = 0; i < elementsToPermute.length; i++) {
      let nextPermutation = [...currentPermutation, elementsToPermute[i]];
      let remainingElements = elementsToPermute.slice(i + 1);
      getContainerCombinationsRecursive(
        generatedPermutations,
        nextPermutation,
        remainingElements,
        destinationValue
      );
    }
  }
}

console.log(getContainerCombinations(input, destinationVolume).length);
