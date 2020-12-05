import { boardingPasses } from './input';

const seats: Seat[] = [];

boardingPasses.forEach(pass => {
  const rowMap = pass.slice(0, 7).split('');
  const colMap = pass.slice(7).split('');

  let rowRange = [0, 128];
  rowMap.forEach(direction => {
    rowRange = halve(rowRange, direction);
  });

  let colRange = [0, 8];
  colMap.forEach(direction => {
    colRange = halve(colRange, direction);
  });

  seats.push({
    row: rowRange[0],
    col: colRange[0],
    id: rowRange[0] * 8 + colRange[0],
  });
});

/**
 * Answer
 */
console.log(`The highest seat ID is ${Math.max(...seats.map(s => s.id))}`);


/**
 * Helper Functions
 */
function halve(range: number[], direction: string): number[] {
  const isUpper = ['F', 'L'].includes(direction);
  const [min, max] = range;
  // TODO: Make more robust
  const midPoint = (max - min) / 2; // won't work if (max-min) were an odd value

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
