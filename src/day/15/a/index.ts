const input = [1,12,0,20,8,16];
const limit = 2020;
const start = input.length - 1;

const speak = [...input];
console.log('>> TESTING >> speak', speak);
for (let i = start; i < limit - 1; i++) {
  const lastSpoken = speak.pop();
  let nextSpoken: number;
  if (!speak.includes(lastSpoken)) {
    nextSpoken = 0;
  } else {
    const spake: number[] = [];
    speak.forEach((w, i) => {
      if (w === lastSpoken) {
        spake.push(i);
      }
    });
    nextSpoken = speak.length - spake.pop();
  }
  speak.push(lastSpoken);
  speak.push(nextSpoken);
}

console.log('>> TESTING >> speak', speak);
console.log('>> TESTING >> speak', speak.pop());
