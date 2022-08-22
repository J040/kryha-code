import { readFileSync } from 'fs';
import { join } from 'path';

function getLanternFishes() {
  let inputs = readFileSync(join('./inputs', 'day6.txt'), 'utf-8');
  let lanternFishes:any = [];
  let formattedInputs = inputs.split(',');
  for (let [index, input] of formattedInputs.entries()) {
    lanternFishes.push(input);
  }
  return lanternFishes;
}

let fishesCycles = [0,0,0,0,0,0,0,0,0];
let fishes = getLanternFishes();
// let fishes:any = [3,4,3,1,2];
// let days = 80;
let days = 256;

for (let fish of fishes) {
  fishesCycles[fish] += 1;
}

for (let day = 1; day <= days; day++) {
  let sum = fishesCycles.reduce((previous:number, current:number) => previous + current, 0)
  // process.stdout.write(`Day: ${day} - Fishes: ${sum}\n`);
  process.stdout.write(`${fishesCycles}\n`);
  // console.log(`Day: ${day} - Fishes: ${sum}`);

  let firstCycle = fishesCycles.slice(0,1);
  let restOfCycle = fishesCycles.slice(1,);
  fishesCycles = restOfCycle.concat(firstCycle);
  fishesCycles[7] += fishesCycles[0];
}