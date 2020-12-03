import { slopeMap } from './input';

const course: string[] = [];
const resetColIndex = slopeMap[0].length;
let colIndex = 0;

slopeMap.forEach(row => {
  course.push(row[colIndex]);

  colIndex = (colIndex + 3)%resetColIndex;
});

console.log(`There were ${course.filter(a => a === '#').length} trees encountered.`);
