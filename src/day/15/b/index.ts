const inputB = [1, 12, 0, 20, 8, 16];
const limitB = 30000000;
const begin = inputB.length + 1;
const inputSet = inputB.map(Number);
const uniqueSpeak = new Map();
let latestWord = inputB[inputB.length - 1];

inputSet.forEach((n, i) => uniqueSpeak.set(n, [i + 1]));
// console.log('>> TESTING >> uniqueSpeak', uniqueSpeak);

for (let i = begin; i <= limitB; i++) {
  const spake = uniqueSpeak.get(latestWord);
  const wasSpoken = spake.length > 1;
  let nextWord = 0;

  if (wasSpoken) {
    nextWord = spake[0] - spake[1];
  }

  talk(nextWord, uniqueSpeak, i);
  // console.log('>> TESTING >> uniqueSpeak', uniqueSpeak);
}

console.log(">> TESTING >> latestWord", latestWord);
// 47205

function talk(n: number, set: Map<number, number[]>, i: number) {
  let recentIndices = [i];
  latestWord = n;
  if (set.has(latestWord)) {
    const word = set.get(latestWord);
    recentIndices.push(word[0]);
  }
  set.set(n, recentIndices);
  // console.log('>> TESTING >> spoke', n, set.get(n));
}
