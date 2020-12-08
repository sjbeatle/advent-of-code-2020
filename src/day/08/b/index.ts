import { bootCode } from './input';

interface Instruction {
  _: string;
  com: Command;
  sign: Sign;
  num: number;
}

enum Command {
  'acc' = 'acc',
  'nop' = 'nop',
  'jmp' = 'jmp',
}

enum Sign {
  'subtract' = '-',
  'add' = '+',
}


/**
 * Parse instructions
 */
const instructions = bootCode.map(i => {
  const regex = /(.*) ([+-])(\d+)/;
  const [ _, com, sign, num] = regex.exec(i);
  return {
    _,
    com,
    sign,
    num: parseInt(num, 10),
  } as Instruction;
});


/**
 * Fix corrupted instruction
 */
let index: number;
instructions.some((instruction, i) => {
  const original = instruction.com;
  instruction.com = swap(instruction);
  const endIndex = run(instructions, true);
  if (endIndex === 0) {
    index = i;
    return true;
  }
  instruction.com = original;
});

function run(instructions: Instruction[], test?: boolean) {
  const length = instructions.length;
  const cursors = [];
  let repeated = false;
  let cursor = 0;
  let accumulator = 0;

  while (!repeated) {
    const instruction = instructions[cursor];
    cursors.push(cursor);

    switch (instruction.com) {
      case Command.acc:
        accumulator = instruction.sign === Sign.add
          ? accumulator + instruction.num
          : accumulator - instruction.num;
        cursor++;
        break;

      case Command.jmp:
        cursor = instruction.sign === Sign.add
          ? cursor + instruction.num
          : cursor - instruction.num;
        break;

      case Command.nop:
        cursor++;
        break;
    }

    repeated = cursors.includes(cursor) || cursor === length;
  }

  return test ? length - cursor : accumulator;
}

console.log(`The accumulator value is ${run(instructions)}`);


/**
 * Helper functions
 */
function swap(instruction: Instruction): Command {
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
