const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const startMolecule = input.pop();
const substitutes = input.reduce((map, currSubst) => {
  const [element, substitution] = currSubst.split(" => ");
  if (map[element] === undefined) map[element] = [];
  map[element] = [...map[element], substitution];
  return map;
}, {});

let molecules = new Set();
for (let i = 0; i < startMolecule.length; i++) {
  for (element in substitutes) {
    if (startMolecule.substring(i).startsWith(element)) {
      for (let substitution of substitutes[element]) {
        const newMolecule =
          startMolecule.substring(0, i) +
          substitution +
          startMolecule.substring(i + element.length);
        molecules.add(newMolecule);
      }
    }
  }
}

console.log(molecules.size);
