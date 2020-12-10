import { outputJoltages} from './input';

const sortedJoltages = outputJoltages.sort((a, b) => a - b);
sortedJoltages.unshift(0); // prepend the outlet
sortedJoltages.push(sortedJoltages[sortedJoltages.length -1] + 3); // append the device

let joltDiffs = '';
sortedJoltages.forEach((joltage, i) => {
  if (i === 0)
    return;

  joltDiffs = joltDiffs + (joltage - sortedJoltages[i - 1]);
});

const diffOne = joltDiffs.match(/1/g).length;
const diffThree = joltDiffs.match(/3/g).length;

console.log(`The number of 1-jolt differences(${diffOne}) multiplied by the number of 3-jolt differences(${diffThree}) is:\n${diffOne * diffThree}`);
