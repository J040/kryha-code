import { readFileSync } from 'fs';
import { join } from 'path';

function getCoordinates() {
  let inputs:string = readFileSync(join('./inputs', 'day5.txt'), 'utf-8');
  let coordinates:any[] = [];
  let formattedInputs:string[] = inputs.split('\n');
  for (let [index, input] of formattedInputs.entries()) {
    let splittedValues:string[] = input.split(' -> ');
    let coordinate:any = { x1: 0, y1: 0, x2: 0, y2: 0 };
    for (let [index, value] of splittedValues.entries()) {
      let xy:string[] = value.trim().split(',');
      if (index == 0) {
        coordinate['x1'] = parseInt(xy[0]);
        coordinate['y1'] = parseInt(xy[1]);
      } else {
        coordinate['x2'] = parseInt(xy[0]);
        coordinate['y2'] = parseInt(xy[1]);
      }
    }
    coordinates.push(coordinate);
  }
  return coordinates;
}

function findDangerousCoordinates() {
  let matrix:number[][] = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
  let coordinates:any[] = getCoordinates();
  
  for (let coordinate of coordinates) {
    
    if (coordinate['x1'] == coordinate['x2']) {
      if (coordinate['y1'] < coordinate['y2']) {
        for (let y = coordinate['y1']; y <= coordinate['y2']; y++) {
          matrix[y][coordinate['x1']] += 1;
        }
      } else {
        for (let y = coordinate['y2']; y <= coordinate['y1']; y++) {
          matrix[y][coordinate['x1']] += 1;
        }
      }
  
    } else if (coordinate['y1'] == coordinate['y2']) {
      if (coordinate['x1'] < coordinate['x2']) {
        for (let x = coordinate['x1']; x <= coordinate['x2']; x++) {
          matrix[coordinate['y1']][x] += 1;
        }
      } else {
        for (let x = coordinate['x2']; x <= coordinate['x1']; x++) {
          matrix[coordinate['y1']][x] += 1;
        }
      }
  
    }
  }
  
  let dangerousCoordinates:number = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0 ; x < matrix[y].length; x++) {
      if (matrix[y][x] > 1) {
        console.log('danger at: [', y, '][', x, ']');
        dangerousCoordinates += 1;
      }
    }
  }
  console.log('There are ', dangerousCoordinates, 'dangerous coordinates!');
}

findDangerousCoordinates();