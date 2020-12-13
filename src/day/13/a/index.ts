import { earliestDeparture, busIds, exampleDeparture, exampleBusIds } from './input';

const closestDepartures: number[] = [];
(busIds as number[]).forEach(id => {
  let newDeparture = 0;
  while(newDeparture < earliestDeparture) {
    newDeparture += id;
  }
  closestDepartures.push(newDeparture);
});

const closestDeparture = Math.min(...closestDepartures);
const busIndex = closestDepartures.indexOf(closestDeparture);
const busId = busIds[busIndex] as number;
const timeWait = closestDeparture - earliestDeparture;

console.log(`My earliest departure is: ${earliestDeparture}`);
console.log(`My closest departure is: ${closestDeparture}`);
console.log(`Which is on bus: ${busId}`);
console.log(`I'll have to wait: ${timeWait}`);
console.log(`Therefore ${busId} multiplied by ${timeWait} is: ${busId * timeWait}`);
