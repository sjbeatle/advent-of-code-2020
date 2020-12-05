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

console.log(`The highest seat ID is ${Math.max(...seats.map(s => s.id))}`);

function half(range: number[], half: string): number[] {
  const isUpper = ['F', 'L'].includes(half);
  const [min, max] = range;
  const midPoint = (max - min) / 2;

  return isUpper
    ? [min, max - midPoint]
    : [min + midPoint, max];
}

interface Seat {
  row: number,
  col: number,
  id: number,
}
