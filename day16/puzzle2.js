const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => x.length > 0);

  const upperRegex = /^Sue (\d+): (.+)/;

  const searchedAuntProperties = {
    children: (x) => x == 3,
    cats: (x) => x > 7,
    samoyeds: (x) => x == 2,
    pomeranians: (x) => x < 3,
    akitas: (x) => x == 0,
    vizslas: (x) => x == 0,
    goldfish: (x) => x < 5,
    trees: (x) => x > 3,
    cars: (x) => x == 2,
    perfumes: (x) => x == 1,
  };

  for (const aunt of input) {
    const result = upperRegex.exec(aunt);
    const auntNumber = parseInt(result[1]);
    const propertiesRaw = result[2].split(", ");

    let isMatchingAunt = true;
    for (const prop of propertiesRaw) {
      const [propName, propValue] = prop.split(": ");
      if (!searchedAuntProperties[propName](parseInt(propValue))) {
        isMatchingAunt = false;
      }
    }
    if (isMatchingAunt) {
      return auntNumber;
    }
  }
};
