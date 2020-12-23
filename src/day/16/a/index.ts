import { example, input } from './input';

const sections = input.split(/\n\n/);
const rules: number[] = [];
sections[0].match(/(\d*-\d*)/g).forEach(r => {
  const minMax = r.split('-');
  let min = parseInt(minMax[0], 10)
  const max = parseInt(minMax[1], 10)

  while (min <= max) {
    rules.push(min);
    min++;
  }
})
const myTicket = Array.from(sections[1].split(/\n/)[1].split(',')).map(Number);
console.log('>> TESTING >> rules', rules);
console.log('>> TESTING >> myTicket', myTicket);
const nearby = new Map<any, number[]>();
nearby.set('m', myTicket)
sections[2].split(/\n/).slice(1).forEach((t, i) => {
  nearby.set(i, Array.from(t.split(',').map(Number)));
});

console.log('>> TESTING >> nearby', nearby);

const invalid: number[] = [];

nearby.forEach(t => {
  t.forEach(n => {
    if (!rules.includes(n)) {
      invalid.push(n);
    }
  })
})

console.log('>> TESTING >> invalid', invalid);
console.log('>> TESTING >> Answer:', invalid.reduce((a, b) => a + b));
