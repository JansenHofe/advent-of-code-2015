const fs = require("fs");

const bitmask16 = 0b00000000000000001111111111111111;

function getWireInput(identifier, instructionMap, instructionCache) {
  // if instruction is a number, return it
  if (!isNaN(identifier)) {
    return parseInt(identifier);
  }

  // search for instruction in chache, if it exists, return it
  if (instructionCache.has(identifier)) {
    return instructionCache.get(identifier);
  }

  // parse instruction rule
  const inputRule = instructionMap.get(identifier);
  const inputRuleParts = inputRule.split(" ");

  let result;
  // instructions consisting of one word are always direct assignments
  if (inputRuleParts.length == 1) {
    result = getWireInput(inputRuleParts[0], instructionMap, instructionCache);

    // instructions consisting of two word should always be negotiations
  } else if (inputRuleParts.length == 2 && inputRuleParts[0] == "NOT") {
    result = ~getWireInput(inputRuleParts[1], instructionMap, instructionCache) & bitmask16;

    // instructions consisting of three words are AND, OR, LSHIFT, RSHIFT
  } else if (inputRuleParts.length == 3) {
    const a = getWireInput(inputRuleParts[0], instructionMap, instructionCache);
    const b = getWireInput(inputRuleParts[2], instructionMap, instructionCache);
    switch (inputRuleParts[1]) {
      case "AND":
        result = a & b & bitmask16;
        break;
      case "OR":
        result = (a | b) & bitmask16;
        break;
      case "LSHIFT":
        result = (a << b) & bitmask16;
        break;
      case "RSHIFT":
        result = (a >>> b) & bitmask16;
        break;
      default:
        throw new Error("unknown operation");
    }
  }

  instructionCache.set(identifier, result);
  return result;
}

module.exports.getSolution = () => {
  const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" }).split("\n");

  const instructionMap = new Map();
  const instructionCache = new Map();

  input.forEach((instruction) => {
    const instructionSplit = instruction.split(" -> ");
    instructionMap.set(instructionSplit[1], instructionSplit[0]);
  });

  return getWireInput("a", instructionMap, instructionCache);
};
