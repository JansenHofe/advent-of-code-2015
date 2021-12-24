const fs = require("fs");

function getSumOfNumbers(input) {
  const object = JSON.parse(input);
  let sum = 0;
  function traverseObject(obj) {
    if (typeof obj === "number") {
      sum += obj;
    } else if (Array.isArray(obj)) {
      for (const entry of obj) {
        traverseObject(entry);
      }
    } else if (typeof obj === "object") {
      for (const property in obj) {
        if (obj[property] === "red") {
          return;
        }
      }
      for (const property in obj) {
        traverseObject(obj[property]);
      }
    }
  }
  traverseObject(object);
  return sum;
}

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" });
  return getSumOfNumbers(input);
};
