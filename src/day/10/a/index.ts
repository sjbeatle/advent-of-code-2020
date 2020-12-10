import { example, outputJoltages} from './input';

const sortedJoltages = outputJoltages.sort((a, b) => a - b);
sortedJoltages.unshift(0);
sortedJoltages.push(sortedJoltages[sortedJoltages.length -1] + 3);

const joltDiffs: number[] = [];
sortedJoltages.forEach((joltage, i) => {
  if (i === 0)
    return;

  joltDiffs.push(joltage - sortedJoltages[i - 1]);
});

const diffOne = joltDiffs.filter(d => d === 1).length;
const diffThree = joltDiffs.filter(d => d === 3).length;

console.log(`The number of 1-jolt differences(${diffOne}) multiplied by the number of 3-jolt differences(${diffThree}) is:\n${diffOne * diffThree}`);
