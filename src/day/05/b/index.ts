import { boardingPasses } from './input';

const rows = 128;
const cols = 8;
const seats: Seat[] = [];

boardingPasses.forEach(p => {
  const rowMap = p.slice(0, 7).split('');
  const colMap = p.slice(7).split('');

  let row = [0, rows];
  rowMap.forEach(step => {
    row = half(row, step);
  });

  let col = [0, cols];
  colMap.forEach(step => {
    col = half(col, step);
  });

  seats.push({
    row: row[0],
    col: col[0],
    id: row[0] * 8 + col[0],
  });
});

const mySeat = findMissingNumber(
  seats
    .map(s => s.id).
    sort((a, b) => a > b ? 1 : -1),
);

console.log(`My seat ID is ${mySeat}`);

/**
 * Helper Functions
 */

function findMissingNumber(arr: number[]): number {
  // only two items? the missing number is between them
  if (arr.length === 2) {
    const testA = arr[0] + 1;
    const testB = arr[arr.length - 1] + 1;
    return testA === testB
      ? testA
      : undefined;
  }

  const mid = Math.ceil(arr.length / 2);
  const arrA = [ ...arr ];
  const arrB = arrA.splice(mid);
  const arrAL = arrA.length - 1;
  const arrBL = arrB.length - 1;

  // is first half of the array missing a number?
  if (arrA[arrAL] - arrA[0] !== arrAL) {
    return findMissingNumber(arrA);
  }

  // is second half of the array missing a number?
  if (arrB[arrBL] - arrB[0] !== arrBL) {
    return findMissingNumber(arrB);
  }

  // if we're this far, our missing number is between the arrays
  const afterA = arrA[arrAL] + 1;
  const beforeB = arrB[0] - 1;
  return afterA === beforeB
    ? afterA
    : undefined;

  // let min = 0;
  // let max = sort.length - 1;
  // let mid;

  // while ((max - min) > 1) {
  //   mid = Math.floor((min + max) / 2);
  //   if ((sort[min] - min) !== (sort[mid] - mid)) {
  //     max = mid;
  //   } else if ((sort[max] - max) !== (sort[mid] - mid)) {
  //     min = mid;
  //   }

  //   if (sort[max] - sort[min] === 2) {
  //     mid = min;
  //     break;
  //   }
  // }

  // return sort[mid] + 1;
}


function half(range: number[], half: string): number[] {
  const isUpper = ['F', 'L'].includes(half);
  const [min, max] = range;
  const midPoint = (max - min) / 2;

  return isUpper
    ? [min, max - midPoint]
    : [min + midPoint, max];
}

/**
 * Interfaces
 */

interface Seat {
  row: number,
  col: number,
  id: number,
}
