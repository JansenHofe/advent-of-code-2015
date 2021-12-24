const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const inputTime = 2503;
const inputRegex = /^(\w+)\scan\sfly\s(\d+)\skm\/s\sfor\s(\d+)\sseconds,\sbut\sthen\smust\srest\sfor\s(\d+)\sseconds./;

let reindeers = [];
for (let line of input) {
  let result = inputRegex.exec(line);
  reindeers.push({
    name: result[1],
    flySpeed: parseInt(result[2]),
    flyTime: parseInt(result[3]),
    restTime: parseInt(result[4]),
    cycleTime: parseInt(result[3]) + parseInt(result[4]),
    distance: 0,
    points: 0,
  });
}

for (let time = 0; time < inputTime; time++) {
  for (let reindeer of reindeers) {
    let secondsCurrentCycle = time % reindeer.cycleTime;
    if (secondsCurrentCycle < reindeer.flyTime) {
      reindeer.distance += reindeer.flySpeed;
    }
  }
  let maxDistReindeer = reindeers.reduce((prev, curr) =>
    prev.distance > curr.distance ? prev : curr
  );
  maxDistReindeer.points++;
}

let winner = reindeers.reduce((prev, curr) =>
  prev.points > curr.points ? prev : curr
);
console.log(winner);
