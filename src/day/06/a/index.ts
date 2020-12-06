import { answerSheet } from './input';

let groupYesCounts: number[] = [];

answerSheet
  .split('\n\n')
  .map(a => a.replace(/\n/g, ''))
  .map(set => {
    groupYesCounts.push(new Set(set).size);
  });

console.log(`All groups have answered yes to a total of ${groupYesCounts.reduce((a, b) => a + b)} questions.`);
