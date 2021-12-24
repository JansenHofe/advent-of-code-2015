const fs = require("fs");

function getFirstGroupOptions(packages, targetGroupWeight) {
  let minPackagesPerGroup = Infinity;

  function getGroups(allGroups, currGroup, packagesToPermutate) {
    if (currGroup.length > minPackagesPerGroup) {
      return;
    }
    const currGroupWeight = currGroup.reduce((sum, curr) => sum + curr, 0);
    if (currGroupWeight > targetGroupWeight) {
      return;
    } else if (currGroupWeight == targetGroupWeight) {
      minPackagesPerGroup =
        currGroup.length < minPackagesPerGroup ? currGroup.length : minPackagesPerGroup;
      allGroups.push(currGroup);
    } else {
      for (let i = 0; i < packagesToPermutate.length; i++) {
        const nextGroup = [...currGroup, packagesToPermutate[i]];
        const remainingPackages = packagesToPermutate.slice(i + 1);
        getGroups(allGroups, nextGroup, remainingPackages);
      }
    }
  }

  let possibleGroups = [];
  getGroups(possibleGroups, [], packages);
  return possibleGroups;
}

function getMinQuantumEntanglement(groupOptions) {
  return groupOptions.reduce((min, currGroup) => {
    const quantEnt = currGroup.reduce((prod, currPackage) => prod * currPackage, 1);
    return quantEnt < min ? quantEnt : min;
  }, Infinity);
}

module.exports.getSolution = () => {
  const packages = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => x.length > 0)
    .map((x) => parseInt(x))
    .reverse();

  const groupCount = 3;
  const groupWeight = packages.reduce((sum, curr) => sum + curr) / groupCount;

  let firstGroupOptions = getFirstGroupOptions(packages, groupWeight);
  return getMinQuantumEntanglement(firstGroupOptions);
};
