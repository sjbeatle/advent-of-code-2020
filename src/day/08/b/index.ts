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

interface Instruction {
  _: string;
  com: string;
  sign: string;
  num: number;
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

let index: number;
instructions.some((instruction, i) => {
  const original = instruction.com;
  instruction.com = swap(instruction);
  const endIndex = test();
  instruction.com = original;
  if (endIndex === 0) {
    index = i;
    return true;
  }
});

function getAccumulator() {
  instructions[index].com = swap(instructions[index]);
  return test(true);
}

function swap(instruction: Instruction): string {
  const { com, num, sign } = instruction;
  if (
    com === Command.acc
    || (com === Command.jmp && num === 1  && sign === Sign.add)
    || (com === Command.nop && num === 0)
  ) {
    return com;
  }

  return Command.jmp ? Command.nop : Command.jmp;
}

function test(acc?: boolean) {
  const length = instructions.length;
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

    repeated = indices.includes(i) || i === length;
  }

  return acc ? accumulator : length - i;
}

console.log(`The accumulator value is ${getAccumulator()}`);
