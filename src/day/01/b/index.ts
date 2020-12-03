import { expenseReport } from './input';

const threeCaballeros = 2020;
let bail = false;
let donald: number;
let panchito: number;
let jose: number;

expenseReport.some((a, i) => {
  donald = a;
  expenseReport.some((b, j) => {
    if (i === j) {
      return;
    }

    panchito = b;

    expenseReport.some((c, k) => {
      if (i === k || j === k) {
        return;
      }

      jose = c;

      bail = (donald + panchito + jose) === threeCaballeros;

      return bail;
    });

    return bail;
  });

  return bail;
});

console.log(`The expenses that sum to 2020 are: ${donald}, ${panchito}, and ${jose}`);
console.log(`Product (Answer): ${donald * panchito * jose}`);
