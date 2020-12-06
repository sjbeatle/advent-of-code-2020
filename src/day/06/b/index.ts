import { answerSheet } from './input';

let groupYesCounts: number[] = [];
let groupAnswers: string[][] = []

answerSheet
  .split('\n\n')
  .forEach(g => {
    groupAnswers.push(g.split('\n'));
  });

groupAnswers
  .forEach(group => {
    groupYesCounts.push(
      group.length === 1
        ? group[0].length
        : group.reduce((a, b) => intersect(a, b)).length
    );
  });

console.log(`All groups have answered yes to a total of ${groupYesCounts.reduce((a, b) => a + b)} questions.`);

function intersect(a: string, b: string): string {
  const setA: string[] = [ ...new Set(a) ];
  const setB: string[] = [ ...new Set(b) ];
  return setA.filter(x => setB.includes(x)).join('');
}
