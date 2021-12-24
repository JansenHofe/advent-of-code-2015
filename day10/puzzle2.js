function getNextSequence(seq) {
  let nextSeq = "";
  //append any character as otherwise the last input character is not evaluated
  seq += 0;
  let currentCount = 1;
  seq.split("").reduce((prev, curr) => {
    if (curr != prev && prev) {
      nextSeq += currentCount + prev;
      currentCount = 1;
    } else {
      currentCount++;
    }
    return curr;
  });
  return nextSeq;
}

let sequence = "3113322113";
for (let i = 0; i < 50; i++) {
  sequence = getNextSequence(sequence);
}

console.log(sequence.length);
