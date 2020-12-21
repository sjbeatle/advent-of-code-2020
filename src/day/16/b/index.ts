import { example, input } from './input';

const sections = input.split(/\n\n/);
const ruleitems = sections[0].split('\n');
const allRules = new Map<string, number[]>();
const baseRules: number[] = [];
ruleitems.forEach(ri => {
  const separate = ri.split(':');
  // console.log('>> TESTING >> seperate', separate);
  const ruleKey = separate[0];
  const rules: number[] = [];
  separate[1].match(/(\d*-\d*)/g).forEach(r => {
    // console.log('>> TESTING >> r', r);
    const minMax = r.split('-');
    let min = parseInt(minMax[0], 10)
    const max = parseInt(minMax[1], 10)

    while (min <= max) {
      rules.push(min);
      baseRules.push(min);
      min++;
    }
  })
  allRules.set(ruleKey, rules);
});
const myTicket = Array.from(sections[1].split(/\n/)[1].split(',')).map(Number);
// console.log('>> TESTING >> rules', allRules);
// console.log('>> TESTING >> myTicket', myTicket);
const nearby = new Map<any, number[]>();
nearby.set('m', myTicket)
sections[2].split(/\n/).slice(1).forEach((t, i) => {
  nearby.set(i, Array.from(t.split(',').map(Number)));
});

// console.log('>> TESTING >> nearby', nearby);

const cols = new Map<number, number[]>();

nearby.forEach((t, k) => {
  t.some((n, i) => {
    if (!baseRules.includes(n)) {
      nearby.delete(k);
      return true;
    }
  })
})

nearby.forEach((t, k) => {
  t.some((n, i) => {
    const col = cols.get(i);
    col ?
      cols.set(i, [...col, n]) :
      cols.set(i, [n]);
  })
})

// console.log('>> TESTING >> nearby', nearby);
// console.log('>> TESTING >> cols', cols);

const notCols = new Map<number, string[]>();
cols.forEach((col, i) => {
  allRules.forEach((rule, key) => {
    let difference = col.filter(x => !rule.includes(x));
    if (difference.length) {
      const notCol = notCols.get(i);
      if (!notCol) {
        notCols.set(i, [key])
      } else {
        notCols.set(i, [key, ...notCol])
      }
    } else {
      notCols.set(i, []);
    }
  });
})
// console.log('>> TESTING >> notCols', notCols);



let keys = Array.from( allRules.keys() );
const finalMap = new Map<string, number>();
console.log('>> TESTING >> notCols', notCols);
while (finalMap.size < allRules.size) {
  let runningTally: string[] = [];
  let i = 0;
  notCols.forEach((v, k) => {
    // console.log('>> TESTING >> v', v);
    // console.log('>> TESTING >> keys', keys);
    if (v.length === keys.length - 1) {
      const difference = keys.filter(x => !v.includes(x));
      if (difference.length) {
        runningTally = [...difference, ...runningTally];
        finalMap.set(difference[0], i);
      }
    } else if (v.length === 1 && keys.length === 1) {
      // console.log('>> TESTING >> v', v);
      // console.log('>> TESTING >> keys', keys);
      runningTally = [keys[0], ...runningTally];
      finalMap.set(keys[0], i);
    } else if (v.length === 0) {
      console.log('>> TESTING >> keys', keys);
      console.log('>> TESTING >> i', i);
      finalMap.set('', i);
    }
    i++;
  })
  runningTally.forEach(r => {
    keys = keys.filter(k => k !== r);
  })
}

console.log('>> TESTING >> notCols', notCols);
console.log('>> TESTING >> finalMap', finalMap);
// console.log('>> TESTING >> myTicket', myTicket);

const indicesA = [2, 16,18,10,5,14];
const indicesb = [2, 17,19,11,6,15];
let total = 1;
indicesA.forEach(n => {
  // console.log('>> TESTING >> myTicket[n]', myTicket[n]);
  total = total * myTicket[n];
})
// console.log('>> TESTING >> myTicket A', total);
total = 1;
indicesb.forEach(n => {
  total = total * myTicket[n];
})
// console.log('>> TESTING >> myTicket B', total);
// console.log('>> TESTING >> Answer:', invalid.reduce((a, b) => a + b));
