import { readFileSync } from 'fs';
import { join } from 'path';

function getLanternFishes() {
  let inputs:string = readFileSync(join('./inputs', 'day6.txt'), 'utf-8');
  let lanternFishes:number[] = [];
  let formattedInputs:string[] = inputs.split(',');
  for (let [index, input] of formattedInputs.entries()) {
    lanternFishes.push(parseInt(input));
  }
  return lanternFishes;
}

let fishesCycles:number[] = [0,0,0,0,0,0,0,0,0];
let fishes:number[] = getLanternFishes();
// let fishes:number[] = [3,4,3,1,2];
// let days:number = 80;
let days:number = 256;

for (let fish of fishes) {
  fishesCycles[fish] += 1;
}

for (let day = 1; day <= days; day++) {
  let sum:number = fishesCycles.reduce((previous:number, current:number) => previous + current, 0)
  // process.stdout.write(`[${fishesCycles}]\n`);
  console.log(`Day: ${day} - Fishes: ${sum}`);

  let firstCycle:number[] = fishesCycles.slice(0,1);
  let restOfCycle:number[] = fishesCycles.slice(1,);
  fishesCycles = restOfCycle.concat(firstCycle);
  fishesCycles[7] += fishesCycles[0];
}