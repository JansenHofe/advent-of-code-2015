const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const startMolecule = input.pop();
const substitutes = input.map((currLine) => {
  const [element, substitution] = currLine.split(" => ");
  return { element: element, substitution: substitution };
});

let next = startMolecule;
let counter = 0;
while (next !== "e") {
  for (const substitute of substitutes) {
    if (next.includes(substitute.substitution)) {
      next = next.replace(substitute.substitution, substitute.element);
      counter++;
    }
  }
}

console.log(counter);
