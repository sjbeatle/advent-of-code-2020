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
 * Program
 */
function run(instructions: Instruction[]) {
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

    repeated = cursors.includes(cursor);
  }

  return accumulator;
}


/**
 * Answer
 */
console.log(`The accumulator value immediately before any instruction is executed a second time is ${run(instructions)}`);
