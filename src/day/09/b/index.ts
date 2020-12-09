import { portNumbers, example } from '../a/input';

const a = 23278925;
// const a = 127;
let min = 0;
let max = 0;

portNumbers.some((_port, i) => {
  const test = dealCards(i);
  if (test) {
    const contiguous = portNumbers.slice(i, test);
    min = Math.min(...contiguous);
    max = Math.max(...contiguous);
    return true;
  }
});

console.log(`The encryption weakness in my XMAS-encrypted list of numbers is ${min + max}.`);

function dealCards(index: number): number {
  let hand = 0;
  let bust = false;
  let i = index;
  let blackJack = false;

  while(!bust && !blackJack) {
    const hit = portNumbers[i];
    hand += hit;
    blackJack = hand === a;
    bust = hand > a || Number.isNaN(hand);
    i++;
  }

  return blackJack ? i : 0;
}
