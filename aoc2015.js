const { performance } = require("perf_hooks");

function executeAll() {
  let result = {};
  for (let day = 1; day <= 25; day++) {
    const dayString = "day" + ("" + day).padStart(2, "0");
    result[dayString] = {};
    [1, 2].forEach((num) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write("Processing day " + day + " part " + num + "...");

      const puzzle = require("./" + dayString + "/puzzle" + num);
      const start = performance.now();
      result[dayString]["puzzle " + num] = puzzle.getSolution();
      const end = performance.now();
      result[dayString]["puzzle " + num + " time (ms)"] = parseFloat((end - start).toFixed(4));
    });
  }
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.table(result);
}

function executeDay(dayString) {
  if (!isNaN(dayString) && parseInt(dayString) > 0 && parseInt(dayString) <= 25) {
    const dayStr = "day" + ("" + parseInt(dayString)).padStart(2, "0");
    [1, 2].forEach((num) => {
      const puzzle = require("./" + dayStr + "/puzzle" + num);
      console.log(dayStr + " part " + num + ": " + puzzle.getSolution());
    });
  } else {
    console.error("invalid argument");
  }
}

function executeDayPuzzle(dayString, puzzleString) {
  if (
    !isNaN(dayString) &&
    parseInt(dayString) > 0 &&
    parseInt(dayString) <= 25 &&
    !isNaN(puzzleString) &&
    parseInt(puzzleString) >= 1 &&
    parseInt(puzzleString) <= 2
  ) {
    const dayStr = "day" + ("" + parseInt(dayString)).padStart(2, "0");
    const puzzle = require("./" + dayStr + "/puzzle" + parseInt(puzzleString));
    console.log(dayStr + " part " + puzzleString + ": " + puzzle.getSolution());
  } else {
    console.error("invalid arguments");
  }
}

if (process.argv.length == 2) {
  executeAll();
} else if (process.argv.length == 3) {
  executeDay(process.argv[2]);
} else if (process.argv.length == 4) {
  executeDayPuzzle(process.argv[2], process.argv[3]);
} else {
  console.error("unsupported number of arguments");
}
