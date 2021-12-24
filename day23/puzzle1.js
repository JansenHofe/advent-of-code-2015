const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf8" });

function parseProgram(input) {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      return { op: line.substring(0, 3), args: line.substring(4).split(", ") };
    });
}

let instructionHandlers = {
  hlf: (registers, r) => {
    registers[r] /= 2;
    registers.pc++;
  },
  tpl: (registers, r) => {
    registers[r] *= 3;
    registers.pc++;
  },
  inc: (registers, r) => {
    registers[r]++;
    registers.pc++;
  },
  jmp: (registers, offset) => {
    registers.pc += parseInt(offset);
  },
  jie: (registers, r, offset) => {
    registers.pc += registers[r] % 2 == 0 ? parseInt(offset) : 1;
  },
  jio: (registers, r, offset) => {
    registers.pc += registers[r] == 1 ? parseInt(offset) : 1;
  },
};

let registers = { a: 0, b: 0, pc: 0 };
const program = parseProgram(input);
while (true) {
  const instr = program[registers.pc];
  if (instr == undefined) break;
  instructionHandlers[instr.op](registers, ...instr.args);
}

console.log(registers.b);
