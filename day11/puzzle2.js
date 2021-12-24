function calcNextValidPassword(password) {
  let nextPw = password;

  while (true) {
    nextPw = increaseChar(nextPw, 7);
    if (hasNoConfusingChar(nextPw) && hasTwoCharPairs(nextPw) && hasThreeIncreasingChars(nextPw)) {
      break;
    }
  }
  return nextPw;
}

function increaseChar(password, index) {
  if (password.charAt(index) == "z") {
    let pwArray = password.split("");
    pwArray[index] = "a";
    return increaseChar(pwArray.join(""), index - 1);
  }

  let pwArray = password.split("");
  pwArray[index] = String.fromCharCode(password.charCodeAt(index) + 1);
  return pwArray.join("");
}

function hasThreeIncreasingChars(password) {
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password.charCodeAt(i) + 1 == password.charCodeAt(i + 1) &&
      password.charCodeAt(i + 1) + 1 == password.charCodeAt(i + 2)
    ) {
      return true;
    }
  }
  return false;
}

function hasNoConfusingChar(password) {
  const confusingChars = ["i", "o", "l"];
  return !confusingChars.some((char) => password.includes(char));
}

function hasTwoCharPairs(password) {
  let existingPairChars = new Set();
  for (let i = 0; i < password.length - 1; i++) {
    if (password.charAt(i) == password.charAt(i + 1)) {
      existingPairChars.add(password.charAt(i));
    }
  }
  return existingPairChars.size >= 2;
}

module.exports.getSolution = () => {
  const input = "hepxcrrq";
  const firstValidPassword = calcNextValidPassword(input);
  return calcNextValidPassword(firstValidPassword);
};
