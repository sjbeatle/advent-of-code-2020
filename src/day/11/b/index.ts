import { seatLayout } from './input';

enum Directions {
  'TL' = 'TL',
  'T' = 'T',
  'TR' = 'TR',
  'L' = 'L',
  'R' = 'R',
  'BL' = 'BL',
  'B' = 'B',
  'BR' = 'BR',
}

interface Neighbors {
  neighbors: Neighbor;
  x: number;
  y: number;
}

type Neighbor = {
  [key in Directions]: string;
}

interface Seat {
  val: string;
  x: number;
  y: number;
}

const seatMatrix = seatLayout.map(row => {
  return row.split('');
});


function getValueByCoordinate(matrix: string[][], x: number, y: number): string {
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
    return 'X';
  }

  return matrix[y][x];
}

function getNeighbors(matrix: string[][], x: number, y: number): Neighbor {
  return {
    TL: getFurthestDirection(matrix, x, y, Directions.TL).val,
    T: getFurthestDirection(matrix, x, y, Directions.T).val,
    TR: getFurthestDirection(matrix, x, y, Directions.TR).val,
    L: getFurthestDirection(matrix, x, y, Directions.L).val,
    R: getFurthestDirection(matrix, x, y, Directions.R).val,
    BL: getFurthestDirection(matrix, x, y, Directions.BL).val,
    B: getFurthestDirection(matrix, x, y, Directions.B).val,
    BR: getFurthestDirection(matrix, x, y, Directions.BR).val,
  };
}

function getImmediateDirection(matrix: string[][], x: number, y: number, dir: Directions): Seat {
  const newDir = {
    TL: [x - 1, y - 1],
    T:  [x,     y - 1],
    TR: [x + 1, y - 1],
    L:  [x - 1, y],
    R:  [x + 1, y],
    BL: [x - 1, y + 1],
    B:  [x,     y + 1],
    BR: [x + 1, y + 1],
  }[dir];

  return {
    val: getValueByCoordinate(matrix, newDir[0], newDir[1]),
    x: newDir[0],
    y: newDir[1],
  }
}

function getFurthestDirection(matrix: string[][], x: number, y: number, dir: Directions): Seat {
  let val: Seat = getImmediateDirection.apply(null, arguments);
  if (!val.val.match(/L|#|X/)) {
    val = getFurthestDirection(matrix, val.x, val.y, dir);
  }
  return val;
}


function musicalChairs(matrix: string[][]): string[][] {
  const newSeatLayout: string[][] = [];

  matrix.forEach((row, y) => {
    const newRow: string[] = [];
    row.forEach((col, x) => {
      const neighbors = Object.values(getNeighbors(matrix, x, y));
      const adjacentOccupied = neighbors.filter(a => a === '#').length;
      let newVal = col;

      switch (col) {
        case 'L':
          if (adjacentOccupied === 0) {
            newVal = '#';
          }
          break;

        case '#':
          if (adjacentOccupied >= 5) {
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
