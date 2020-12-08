import { bootCode } from './input';

enum Command {
  'acc' = 'acc',
  'nop' = 'nop',
  'jmp' = 'jmp',
}

enum Sign {
  'subtract' = '-',
  'add' = '+',
}

const instructions = bootCode.map(i => {
  const regex = /(.*) ([+-])(\d+)/;
  const [ _, com, sign, num] = regex.exec(i);
  return {
    _,
    com,
    sign,
    num: parseInt(num, 10),
  };
});

const indices = [];
let repeated = false;
let i = 0;
let accumulator = 0;
while (!repeated) {
  const instruction = instructions[i];
  indices.push(i);

  switch (instruction.com) {
    case Command.acc:
      accumulator = instruction.sign === Sign.add
        ? accumulator + instruction.num
        : accumulator - instruction.num;
      i++;
      break;

    case Command.jmp:
      i = instruction.sign === Sign.add
        ? i + instruction.num
        : i - instruction.num;
      break;

    case Command.nop:
      i++;
      break;
  }

  repeated = indices.includes(i);
}

console.log(`The accumulator value immediately before any instruction is executed a second time is ${accumulator}`);
