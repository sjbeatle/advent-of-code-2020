import { expenseReport } from './input';

const yinYang = 2020;
let bail = false;
let yin: number;
let yang: number;

do {
  yin = expenseReport.shift();
  yang = yinYang - yin;

  bail = expenseReport.includes(yang);
} while (!bail);

console.log(`The expenses that sum to 2020 are: ${yin} and ${yang}`);
console.log(`Product (Answer): ${yin * yang}`);
