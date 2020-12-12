import { seatLayout } from './input';

const seatMatrix = seatLayout.map(row => {
  return row.split('');
});


function getValueByCoordinate(matrix: string[][], x: number, y: number) {
  const matrixRowCount = matrix.length ? matrix.length : 0;
  const matrixColCount = matrix[0] && matrix[0].length ? matrix[0].length : 0;

  if (!matrixRowCount || !matrixColCount) {
    // console.error('Your matrix is not two dimensional!');
    return '.';
  }

  if (
    y > matrixRowCount - 1
    || x > matrixColCount - 1
    || x < 0
    || y < 0
  ) {
    // console.error(`Your point (${x}, ${y}), is out of range.`);
    return '.';
  }

  return matrix[y][x];
}

function getNeighbors(matrix: string[][], x: number, y: number): any[] {
  const TL = [x - 1, y - 1];
  const T  = [x,     y - 1];
  const TR = [x + 1, y - 1];
  const L  = [x - 1, y];
  const R  = [x + 1, y];
  const BL = [x - 1, y + 1];
  const B  = [x,     y + 1];
  const BR = [x + 1, y + 1];

  return [
    getValueByCoordinate(matrix, TL[0], TL[1]),
    getValueByCoordinate(matrix, T[0], T[1]),
    getValueByCoordinate(matrix, TR[0], TR[1]),
    getValueByCoordinate(matrix, L[0], L[1]),
    getValueByCoordinate(matrix, R[0], R[1]),
    getValueByCoordinate(matrix, BL[0], BL[1]),
    getValueByCoordinate(matrix, B[0], B[1]),
    getValueByCoordinate(matrix, BR[0], BR[1]),
  ];
}

function musicalChairs(matrix: string[][]): string[][] {
  const newSeatLayout: string[][] = [];

  matrix.forEach((row, y) => {
    const newRow: string[] = [];
    row.forEach((col, x) => {
      const neighbors = getNeighbors(matrix, x, y);
      const adjacentOccupied = neighbors.filter(a => a === '#').length;
      let newVal = col;

      switch (col) {
        case 'L':
          if (adjacentOccupied === 0) {
            newVal = '#';
          }
          break;

        case '#':
          if (adjacentOccupied >= 4) {
            newVal = 'L';
          }
          break;

        default:
          break;
      }

      newRow.push(newVal);
    });

    newSeatLayout.push(newRow);
  });

  return newSeatLayout;
}

function playMusic(matrix: string[][]): string[][] {
  let stop = false;
  let newSeatMatrix = matrix;

  while (!stop) {
    const begin = [ ...newSeatMatrix ];
    newSeatMatrix = musicalChairs(newSeatMatrix);
    stop = JSON.stringify(begin) === JSON.stringify(newSeatMatrix);
  }

  return newSeatMatrix;
}

const finalMatrix = playMusic(seatMatrix);

console.log(`${JSON.stringify(finalMatrix).match(/#/g).length} seats end up occupied.`);
