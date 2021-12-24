const spells = [
  { cost: 53, damage: 4, heal: 0, armor: 0, poison: 0, mana: 0, name: "magic missle" },
  { cost: 73, damage: 2, heal: 2, armor: 0, poison: 0, mana: 0, name: "drain" },
  { cost: 113, damage: 0, heal: 0, armor: 6, poison: 0, mana: 0, name: "shield" },
  { cost: 173, damage: 0, heal: 0, armor: 0, poison: 6, mana: 0, name: "poison" },
  { cost: 229, damage: 0, heal: 0, armor: 0, poison: 0, mana: 5, name: "recharge" },
];

function handleEffectTimers(player, enemy, effectTimers) {
  player.armor = 0;
  if (effectTimers.armor > 0) {
    player.armor = 7;
    effectTimers.armor--;
  }
  if (effectTimers.poison > 0) {
    enemy.hp -= 3;
    effectTimers.poison--;
  }
  if (effectTimers.mana > 0) {
    player.mana += 101;
    effectTimers.mana--;
  }
}

function checkSpellEffectActive(spell, effectTimers) {
  let effectAlreadyActive = false;
  for (let effectTimerName in effectTimers) {
    if (spell[effectTimerName] > 0 && effectTimers[effectTimerName] > 0) {
      effectAlreadyActive = true;
    }
  }
  return effectAlreadyActive;
}

function playerTurn(player, enemy, spell, effectTimers) {
  if (player.mana - spell.cost >= 0) {
    if (checkSpellEffectActive(spell, effectTimers)) {
      return 0;
    }

    player.mana -= spell.cost;
    player.hp += spell.heal;
    enemy.hp -= spell.damage;

    for (let effectTimerName in effectTimers) {
      effectTimers[effectTimerName] += spell[effectTimerName];
    }
    return spell.cost;
  }
  return 0;
}

function nextRound(player, enemy, effectTimers, spells, spentManaTotal, spentManaAmounts) {
  for (const spell of spells) {
    // clone objects for each permutation
    let playerNext = Object.assign({}, player);
    let enemyNext = Object.assign({}, enemy);
    let effectTimersNext = Object.assign({}, effectTimers);
    let spentManaTotalNext = spentManaTotal;

    //----PLAYER TURN--------
    // handle "hard mode" damage
    playerNext.hp--;
    if (playerNext.hp <= 0) {
      continue;
    }

    // handle effects
    handleEffectTimers(playerNext, enemyNext, effectTimersNext);
    if (enemyNext.hp <= 0) {
      spentManaAmounts.push(spentManaTotalNext);
      continue;
    }

    // handle next spell
    let spentMana = playerTurn(playerNext, enemyNext, spell, effectTimersNext);

    if (spentMana == 0) {
      continue;
    }
    spentManaTotalNext += spentMana;

    //----ENEMY TURN--------
    // handle effects
    handleEffectTimers(playerNext, enemyNext, effectTimersNext);

    if (enemyNext.hp <= 0) {
      spentManaAmounts.push(spentManaTotalNext);
      continue;
    }

    // handle enemy attack
    playerNext.hp -=
      enemyNext.damage - playerNext.armor > 0 ? enemyNext.damage - playerNext.armor : 1;

    if (playerNext.hp <= 0) {
      continue;
    }

    nextRound(
      playerNext,
      enemyNext,
      effectTimersNext,
      spells,
      spentManaTotalNext,
      spentManaAmounts
    );
  }
}

module.exports.getSolution = () => {
  let player = { hp: 50, mana: 500 };
  let enemy = { hp: 71, damage: 10 };
  let effectTimers = { armor: 0, poison: 0, mana: 0 };

  let spentManaAmounts = [];
  nextRound(player, enemy, effectTimers, spells, 0, spentManaAmounts);

  return spentManaAmounts.reduce((min, curr) => (curr < min ? curr : min));
};
