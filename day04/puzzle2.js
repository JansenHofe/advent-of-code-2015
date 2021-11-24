const crypto = require("crypto");

const input = "bgvyzdsv";

let i = 1;
while (true) {
  if (
    crypto
      .createHash("md5")
      .update(input + i)
      .digest("hex")
      .startsWith("000000")
  )
    break;
  i++;
}
console.log(i);
