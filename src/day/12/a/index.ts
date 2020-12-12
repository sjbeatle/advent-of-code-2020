import { navInstructions } from './input';

/**
 * CHECK ROTATIONS!!!
 */
if (navInstructions.filter(a => a.match(/L|R/)).map(a => a.slice(1)).filter(a => parseInt(a, 10)%90 !== 0).length) {
  console.error('We have some tricky rotations!!');
}

enum Compass {
  'North' = 'N',
  'South' = 'S',
  'East' = 'E',
  'West' = 'W',
}

enum Turn {
  'Left' = 'L',
  'Right' = 'R',
}

enum Move {
  'Forward' = 'F',
}

interface Instruction {
  command: Compass | Turn | Move;
  input: number;
}

let facing = Compass.East;
let coordinates = [0, 0];
const parsedNavInstructions = navInstructions.map((i: string): Instruction => {
  return {
    command: (i[0] as Compass | Turn | Move),
    input: parseInt(i.slice(1), 10),
  }
});

function rotate(face: Compass, dir: Turn, degree: number): Compass {
  const steps = degree / 90;
  const opposite = {
    [Compass.North]: Compass.South,
    [Compass.East]: Compass.West,
    [Compass.South]: Compass.North,
    [Compass.West]: Compass.East,
  };
  const rOne = {
    [Compass.North]: Compass.East,
    [Compass.East]: Compass.South,
    [Compass.South]: Compass.West,
    [Compass.West]: Compass.North,
  };
  const lOne = {
    [Compass.North]: Compass.West,
    [Compass.East]: Compass.North,
    [Compass.South]: Compass.East,
    [Compass.West]: Compass.South,
  };
  const rThree = {
    [Compass.North]: rOne[opposite[Compass.North]],
    [Compass.South]: rOne[opposite[Compass.South]],
    [Compass.East]: rOne[opposite[Compass.East]],
    [Compass.West]: rOne[opposite[Compass.West]],
  };
  const lThree = {
    [Compass.North]: lOne[opposite[Compass.North]],
    [Compass.South]: lOne[opposite[Compass.South]],
    [Compass.East]: lOne[opposite[Compass.East]],
    [Compass.West]: lOne[opposite[Compass.West]],
  };

  switch (steps) {
    case 1:
      return dir === Turn.Left ? lOne[face] : rOne[face];

    case 2:
      return opposite[face];

    case 3:
      return dir === Turn.Left ? lThree[face] : rThree[face];
  }
}

parsedNavInstructions.forEach((i, y) => {
  switch (i.command) {
    case Compass.North:
    case Compass.South:
    case Compass.East:
    case Compass.West:
      coordinates = move(i.command, i.input, coordinates);
      break;

    case Turn.Left:
    case Turn.Right:
      facing = rotate(facing, i.command, i.input);
      break;

    case Move.Forward:
      coordinates = move(facing, i.input, coordinates);
      break;
  }
});

function move(face: Compass, steps: number, coordinates: number[]) {
  const newCoord = [ ...coordinates ];
  switch (face) {
    case Compass.North:
      newCoord[1] += steps
      break;

    case Compass.East:
      newCoord[0] += steps
      break;

    case Compass.South:
      newCoord[1] -= steps
      break;

    case Compass.West:
      newCoord[0] -= steps
      break;
  }
  return newCoord;
}

console.log(`I'm facing "${facing}".`);
console.log(`My coordinates are (${coordinates})`);
console.log(`The Manhattan distance between my current location and my starting position is: ${coordinates.reduce((a, b) => Math.abs(a) + Math.abs(b))}`);
