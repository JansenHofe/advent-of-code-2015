module.exports.getSolution = () => {
  const input = 33100000;
  const max = 1000000;

  let houses = [];
  for (let elfNumber = 1; elfNumber < max; elfNumber++) {
    let visitedHouses = 0;
    for (let houseToVisit = elfNumber; houseToVisit <= max; houseToVisit += elfNumber) {
      if (houses[houseToVisit] == undefined) houses[houseToVisit] = 0;
      houses[houseToVisit] += elfNumber * 11;
      visitedHouses++;
      if (visitedHouses == 50) break;
    }
  }

  for (let i = 0; i < houses.length; i++) {
    if (houses[i] >= input) {
      return i;
    }
  }
};
