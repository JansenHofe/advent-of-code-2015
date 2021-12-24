const fs = require("fs");

module.exports.getSolution = () => {
  const input = fs
    .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => x.length > 0);

  const inputTime = 2503;
  const inputRegex = /^(\w+)\scan\sfly\s(\d+)\skm\/s\sfor\s(\d+)\sseconds,\sbut\sthen\smust\srest\sfor\s(\d+)\sseconds./;

  let maxDistance = 0;
  for (let line of input) {
    let result = inputRegex.exec(line);
    let reindeer = {
      name: result[1],
      flySpeed: parseInt(result[2]),
      flyTime: parseInt(result[3]),
      restTime: parseInt(result[4]),
    };
    let cycleTime = reindeer.flyTime + reindeer.restTime;

    let cycleNumber = Math.floor(inputTime / cycleTime);
    let secondsCurrentCycle = inputTime % cycleTime;
    let flyingSecondsCurrentCycle =
      secondsCurrentCycle > reindeer.flyTime ? reindeer.flyTime : secondsCurrentCycle;

    let distance =
      cycleNumber * reindeer.flyTime * reindeer.flySpeed +
      flyingSecondsCurrentCycle * reindeer.flySpeed;

    maxDistance = distance > maxDistance ? distance : maxDistance;
  }

  return maxDistance;
};
