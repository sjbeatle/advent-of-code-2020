import { navInstructions, example } from './input';

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
let coordinates = [0, 0]
let waypoint = [10, 1];
const parsedNavInstructions = navInstructions.map((i: string): Instruction => {
  return {
    command: (i[0] as Compass | Turn | Move),
    input: parseInt(i.slice(1), 10),
  }
});

parsedNavInstructions.forEach((i, y) => {
  switch (i.command) {
    case Compass.North:
    case Compass.South:
    case Compass.East:
    case Compass.West:
      moveWaypoint(i.command, i.input);
      break;

    case Turn.Left:
    case Turn.Right:
      rotate(facing, i.command, i.input);
      break;

    case Move.Forward:
      move(i.input);
      break;
  }
});

function moveWaypoint(face: Compass, steps: number) {
  switch (face) {
    case Compass.North:
      waypoint[1] += steps
      break;

    case Compass.East:
      waypoint[0] += steps
      break;

    case Compass.South:
      waypoint[1] -= steps
      break;

    case Compass.West:
      waypoint[0] -= steps
      break;
  }
}

function move(steps: number) {
  const deltaX = waypoint[0] - coordinates[0];
  const deltaY = waypoint[1] - coordinates[1];
  coordinates = [coordinates[0] + (deltaX * steps), coordinates[1] + (deltaY * steps)];
  waypoint = [coordinates[0] + deltaX, coordinates[1] + deltaY]
}

function rotate(face: Compass, dir: Turn, degree: number) {
  const steps = degree / 90;
  const deltaX = waypoint[0] - coordinates[0];
  const deltaY = waypoint[1] - coordinates[1];

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
      facing = dir === Turn.Left ? lOne[face] : rOne[face];
      waypoint = dir === Turn.Left
        ? [coordinates[0] - deltaY, coordinates[1] + deltaX]
        : [coordinates[0] + deltaY, coordinates[1] - deltaX];
      break;

    case 2:
      facing = opposite[face];
      waypoint = [coordinates[0] - deltaX, coordinates[1] - deltaY];
      break;

    case 3:
      facing = dir === Turn.Left ? lThree[face] : rThree[face];
      waypoint = dir === Turn.Left
        ? [coordinates[0] + deltaY, coordinates[1] - deltaX]
        : [coordinates[0] - deltaY, coordinates[1] + deltaX];
      break;
  }
}

console.log(`The Manhattan distance between my current location and my starting position is: ${coordinates.reduce((a, b) => Math.abs(a) + Math.abs(b))}`);
