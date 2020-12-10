import { outputJoltages } from '../a/input';

const sortedJoltages = outputJoltages.sort((a, b) => a - b);
sortedJoltages.unshift(0); // prepend the outlet
sortedJoltages.push(sortedJoltages[sortedJoltages.length -1] + 3); // append the device

let rating = 3;
let joltDiffs: string = '';
sortedJoltages.forEach((joltage, i) => {
  if (i === 0)
    return;

  joltDiffs = joltDiffs + (joltage - sortedJoltages[i - 1]);
});
// example -> '131113113133'

const contiguousOnes = joltDiffs.match(/(11+)/g);
const contiguousOnesVariations = contiguousOnes.map(a => {
  const count = a.length;

  return count < rating
    ? Math.pow(2, count - 1)
    : (rating * Math.pow(2, count - rating)) + 1;
});

const totalVariations = contiguousOnesVariations.reduce((a, b) => a * b);

console.log(`The total number of distinct ways I can arrange the adapters to connect the charging outlet to my device is:\n${totalVariations}.`);
