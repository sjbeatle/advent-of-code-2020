import { busIds, exampleBusIds } from './input';

// @ts-ignore
const busIdsNum = busIds.map(id => typeof id === 'string' ? -1 : id);
const max = Math.max(...busIdsNum);
const offsetMap = busIdsNum.map((id, i) => {
  return {
    id,
    offset: i,
  };
}).filter(offset => offset.id > 0);
const maxOffset = offsetMap.find(m => m.id === max).offset;
const normalMap = offsetMap.map((m, i) => {
  return {
    id: m.id,
    offset: m.offset - maxOffset,
  };
})
// console.log('>> TESTING >> offsetMap', offsetMap);
console.log('>> TESTING >> max', max);
console.log('>> TESTING >> maxOffset', maxOffset);

offsetMap.sort((a, b) => b.id - a.id);
console.log('>> TESTING >> sortOffset', offsetMap);

//761870795844756
// function longWay(): number {
//   let keepGoing = 1;
//   const increment = max;
//   // console.log('>> TESTING >> increment', increment);
//   let i = increment;
//   while (keepGoing) {
//     const isAllGood: boolean[] = [];
//     // console.group('Round', i);
//     normalMap.forEach(m => {
//       // console.log(`>> TESTING >> (${i} + ${m.offset}) % ${m.id}`, (i + m.offset) % m.id);
//       isAllGood.push((i + m.offset) % m.id === 0);
//     });
//     // console.groupEnd()
//     keepGoing = isAllGood.filter(a => a === false).length;
//     i += increment;
//   }

//   return i - increment + normalMap[0].offset;
// }

let lcm = BigInt(offsetMap[0].id);
let start = BigInt(offsetMap[0].id - offsetMap[0].offset);
// offsetMap.forEach((m, mi) => {
//   if (mi === offsetMap.length -1)
//     return;

//   const congruence = offsetMap[mi + 1];
//   console.log('>> TESTING >> m', m);
//   console.log('>> TESTING >> congruence', congruence);
//   let i = BigInt(1);
//   while((start + (i * lcm)) % BigInt(congruence.id) !== BigInt(congruence.id - congruence.offset)) {
//     i++;
//     // console.log(`TESTING >> [${mi}] >> (${start + (i * lcm)}) % congruence.id`, i, (start + (i * lcm)) % BigInt(congruence.id));
//   }
//   start = start + (i * lcm);
//   lcm = lcm * BigInt(congruence.id);
//   console.log('>> TESTING >> start', start);
//   console.log('>> TESTING >> lcm', lcm);
// });

offsetMap.forEach((m, mi) => {
  if (mi === offsetMap.length -1)
    return;

  const congruence = offsetMap[mi + 1];
  const congruenceoffset = getOffset(BigInt(congruence.id), BigInt(congruence.offset));
  console.log('>> TESTING >> m', m);
  console.log('>> TESTING >> congruence', congruence);
  let i = BigInt(1);
  while((start + (i * lcm)) % BigInt(congruence.id) !== BigInt(congruenceoffset)) {
    i++;
    // console.log(`TESTING >> [${mi}] >> (${start + (i * lcm)}) % ${BigInt(congruence.id)}`, i, (start + (i * lcm)) % BigInt(congruence.id));
  }
  console.log('>> TESTING >> start', start);
  start = start + (i * lcm);
  lcm = lcm * BigInt(congruence.id);
  console.log('>> TESTING >> start', start);
  console.log('>> TESTING >> lcm', lcm);
});
console.log('>> TESTING >> start', start);

function getOffset(cong: bigint, o: bigint) {
  const zero = BigInt(0);

  if (o === zero) {
    return zero;
  }

  let offset = cong - o;
  if (offset < zero)
    offset = o % cong
  return offset;
}

// let i = 1;
// while(((377 + i * 421) % 419 !== 13)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(377 + i * 421)}) % 419`, i, ((377 + i * 421)) % 419);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((100154 + i * 421 * 419) % 41 !== 3)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(100154 + i * 421 * 419)}) % 41`, i, ((100154 + i * 421 * 419)) % 41);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((3628134 + i * 421 * 419 *41) % 37 !== 7)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(3628134 + i * 421 * 419 *41)}) % 37`, i, ((3628134 + i * 421 * 419 *41)) % 37);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((249528340 + i * 421 * 419 * 41 * 37) % 29 !== 13)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(249528340 + i * 421 * 419 * 41 * 37)}) % 29`, i, ((249528340 + i * 421 * 419 * 41 * 37)) % 29);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((6939460415 + i * 421 * 419 * 41 * 37 * 29) % 23 !== 13)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(6939460415 + i * 421 * 419 * 41 * 37 * 29)}) % 23`, i, ((6939460415 + i * 421 * 419 * 41 * 37 * 29)) % 23);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((45741066450 + i * 421 * 419 * 41 * 37 * 29 * 23) % 19 !== 13)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(45741066450 + i * 421 * 419 * 41 * 37 * 29 * 23)}) % 19`, i, ((45741066450 + i * 421 * 419 * 41 * 37 * 29 * 23)) % 19);
// }
// console.log('>> TESTING >> i', i);

// i = 1;
// while(((2327275501308 + i * 421 * 419 * 41 * 37 * 29 * 23 * 19) % 17 !== 10)) {
//   i++;
//   console.log(`TESTING >> [${i}] >> (${(2327275501308 + i * 421 * 419 * 41 * 37 * 29 * 23 * 19)}) % 17`, i, ((2327275501308 + i * 421 * 419 * 41 * 37 * 29 * 23 * 19)) % 17);
// }
// console.log('>> TESTING >> i', i);

// console.log('>> TESTING >> BigInt(43022399910816) + j * BigInt(421 * 419 * 41 * 37 * 29 * 23 * 19 * 17)', BigInt(43022399910816) + BigInt(421 * 419 * 41 * 37 * 29 * 23 * 19 * 17));
// while((BigInt(43022399910816) + j * BigInt(421 * 419 * 41 * 37 * 29 * 23 * 19 * 17)) % BigInt(13) !== BigInt(0)) {
//   j++;
//   console.log(`TESTING >> [${j}] >> (${BigInt(43022399910816) + j * BigInt(421 * 419 * 41 * 37 * 29 * 23 * 19 * 17)}) % 13`, j, (BigInt(43022399910816) + j * BigInt(421 * 419 * 41 * 37 * 29 * 23 * 19 * 17)) % BigInt(13));
// }
// console.log('>> TESTING >> j', j);

// (function () {
//   let start = 17;
//   let i = 0;
//   while((start + (i * 17)) % 13 !== 11) {
//     i++;
//     console.log(`TESTING >> (${start + (i * 17)}) % 13`, i, (start + (i * 17)) % 13);
//   }
//   start = 102
//   i = 1
//   while((start + (i * 13 * 17)) % 19 !== 16) {
//     i++;
//     console.log(`TESTING >> (${start + (i * 13 * 17)}) % 19`, i, (start + (i * 13 * 17)) % 19);
//   }
// })()





/**
 * LIFTED ANSWER!!
 */
// const puzzleInput = '13,x,x,41,x,x,x,37,x,x,x,x,x,419,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,29,x,421,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17'

// const examples = [
// 	{
// 		input: '17,x,13,19',
// 	},
// ]

// examples.forEach( example => verify( example.input ) )
// console.log( '-----------------------------------------' );
// verify( puzzleInput )

// function verify( input: string ) {
// 	const busses = input.split( ',' )
// 	                    .map( bus => bus === 'x' ? null : parseInt( bus ) )
// 	                    .map( ( bus, i ) => bus ? {i, r: BigInt(( bus - i % bus ) % bus), m: BigInt(bus)} : null )
//                       .filter( bus => bus )
//                       console.log('>> TESTING >> busses', busses);

// 	console.log( fastButNotAlwaysGood( busses ) )
// }

// function fastButNotAlwaysGood( numbers: {i: number, r: bigint, m: bigint}[] | null ) {
//   const M: bigint = BigInt(numbers.reduce(( p, n ) => p * Number(n.m), 1 ));
//   const arr: bigint[] = [];
//   numbers.forEach(( n ) => {
//     arr.push(n.r * ( M / n.m ) * inv( M / n.m, n.m ))
//   });
//   let sum = BigInt(0);
//   arr.forEach(s => {
//     sum += s;
//   });

// 	return sum % M;
// }

// inv(BigInt(0), BigInt(1));

// function inv( number: bigint, mod: bigint ): bigint {
// 	const m0 = mod;
// 	let x0 = BigInt(0), x1 = BigInt(1);

// 	if ( mod === BigInt(1) ) {
// 		return BigInt(0);
// 	}

// 	while ( number > 1 ) {
// 		const q = number / mod;
// 		let t = mod;

// 		mod = number % mod;
// 		number = t;

// 		t = x0;

// 		x0 = x1 - q * x0;

// 		x1 = t;
// 	}

// 	if ( x1 < 0 ) {
// 		x1 += m0;
// 	}

// 	return x1;
// }
