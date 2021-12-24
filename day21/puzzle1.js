const weapons = [
  { cost: 8, damage: 4, armor: 0 },
  { cost: 10, damage: 5, armor: 0 },
  { cost: 25, damage: 6, armor: 0 },
  { cost: 40, damage: 7, armor: 0 },
  { cost: 74, damage: 8, armor: 0 },
];

const armor = [
  { cost: 0, damage: 0, armor: 0 },
  { cost: 13, damage: 0, armor: 1 },
  { cost: 31, damage: 0, armor: 2 },
  { cost: 53, damage: 0, armor: 3 },
  { cost: 75, damage: 0, armor: 4 },
  { cost: 102, damage: 0, armor: 5 },
];

const rings = [
  { cost: 0, damage: 0, armor: 0 },
  { cost: 25, damage: 1, armor: 0 },
  { cost: 50, damage: 2, armor: 0 },
  { cost: 100, damage: 3, armor: 0 },
  { cost: 20, damage: 0, armor: 1 },
  { cost: 40, damage: 0, armor: 2 },
  { cost: 80, damage: 0, armor: 3 },
];

const itemMatrix = [weapons, armor, rings, rings];

function generateItemPermutations(generatedPermutation, currentPermutation, itemsToPermutate) {
  if (itemsToPermutate.length == 0) {
    generatedPermutation.push(currentPermutation);
  } else {
    for (let item of itemsToPermutate[0]) {
      let nextPermutation = [...currentPermutation, item];
      let remainingItems = itemsToPermutate.slice(1);
      generateItemPermutations(generatedPermutation, nextPermutation, remainingItems);
    }
  }
}

function generateCharacters(items) {
  let permutations = [];
  generateItemPermutations(permutations, [], items);
  return permutations
    .map((permutation) =>
      permutation.reduce(
        (sum, curr) => {
          for (const property in sum) {
            sum[property] += curr[property];
          }
          return sum;
        },
        { cost: 0, damage: 0, armor: 0 }
      )
    )
    .map((itemSet) => {
      itemSet.hp = 100;
      return itemSet;
    });
}

function getWinner(player, enemy) {
  while (true) {
    enemy.hp -= player.damage - enemy.armor > 0 ? player.damage - enemy.armor : 1;
    if (enemy.hp <= 0) return player;
    player.hp -= enemy.damage - player.armor > 0 ? enemy.damage - player.armor : 1;
    if (player.hp <= 0) return enemy;
  }
}

module.exports.getSolution = () => {
  const input = { hp: 100, damage: 8, armor: 2 };

  let characters = generateCharacters(itemMatrix);
  let minCost = Infinity;
  for (let character of characters) {
    let enemy = Object.assign({}, input);
    if (getWinner(character, enemy) == character) {
      minCost = character.cost < minCost ? character.cost : minCost;
    }
  }
  return minCost;
};
