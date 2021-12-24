const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const upperRegex = /^Sue (\d+): (.+)/;

const searchedAuntProperties = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

for (const aunt of input) {
  const result = upperRegex.exec(aunt);
  const auntNumber = parseInt(result[1]);
  const propertiesRaw = result[2].split(", ");

  let isMatchingAunt = true;
  for (const prop of propertiesRaw) {
    const [propName, propValue] = prop.split(": ");
    if (searchedAuntProperties[propName] !== parseInt(propValue)) {
      isMatchingAunt = false;
    }
  }
  if (isMatchingAunt) {
    console.log(auntNumber);
    break;
  }
}
