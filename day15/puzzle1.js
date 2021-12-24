const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", { encoding: "utf8" })
  .split("\n")
  .filter((x) => x.length > 0);

const inputRegex = /^(\w+):\scapacity\s(-?\d),\sdurability\s(-?\d),\sflavor\s(-?\d),\stexture\s(-?\d),\scalories\s(-?\d)/;

function calcCookieScore(ingredients, ingredientNumbers) {
  let cookieProperties = ingredients[0].map(() => {
    return 0;
  });

  for (
    let ingredientIdx = 0;
    ingredientIdx < ingredients.length;
    ingredientIdx++
  ) {
    for (
      let propIdx = 0;
      propIdx < ingredients[ingredientIdx].length;
      propIdx++
    ) {
      cookieProperties[propIdx] +=
        ingredientNumbers[ingredientIdx] * ingredients[ingredientIdx][propIdx];
    }
  }

  return cookieProperties.reduce((total, currProp) => {
    if (currProp < 0) {
      return total * 0;
    }
    return total * currProp;
  }, 1);
}

let ingredients = [];
for (const line of input) {
  const result = inputRegex.exec(line);
  ingredients.push([
    parseInt(result[2]),
    parseInt(result[3]),
    parseInt(result[4]),
    parseInt(result[5]),
  ]);
}

let maxCookieScore = 0;
for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100; j++) {
    for (let k = 0; k <= 100; k++) {
      for (let l = 0; l <= 100; l++) {
        if (i + j + k + l === 100) {
          const cookieScore = calcCookieScore(ingredients, [i, j, k, l]);
          maxCookieScore =
            cookieScore > maxCookieScore ? cookieScore : maxCookieScore;
        }
      }
    }
  }
}

console.log(maxCookieScore);
