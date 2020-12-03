import { slopeMap } from './input';

const traversals: Traversal[] = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const courses: string[][] = [];
const resetColIndex = slopeMap[0].length;

traversals.forEach(traversal => {
  courses.push(getCourse(traversal.right, traversal.down));
});

const treesByCourse = courses.map(course => course.filter(a => a === '#').length);

console.log(`There were ${treesByCourse.reduce((a, b) => a * b)} trees encountered.`);

/****************************/

function getCourse(right: number, down: number): string[] {
  const course: string[] = [];
  let colIndex = 0;

  slopeMap.forEach((row, i) => {
    if (i%down !== 0) {
      return;
    }

    course.push(row[colIndex]);

    colIndex = (colIndex + right)%resetColIndex;
  });

  return course;
}

/****************************/

interface Traversal {
  right: number;
  down: number;
}
