import { portNumbers, example } from './input';

const preambleLength = 25;

let cursor = preambleLength;
let error = false;
while (!error) {
  const preamble = portNumbers.slice(cursor - preambleLength, cursor);
  error = !check(preamble, portNumbers[cursor]);
  cursor++;
}

function check (list: number[], yinYang: number) {
  let bail = false;
  let yin: number;
  let yang: number;

  while (!bail) {
    if (list.length === 0)
      break;
    yin = list.shift();
    yang = yinYang - yin;

    bail = list.includes(yang);
  }

  return bail;
}

console.log(`The first number that does not have the property is ${portNumbers[cursor - 1]}.`);
