import { readFileSync } from 'fs';
import { join } from 'path';

function getInputs() {
  let boards:any = [];
  let randomNumbers:any = [];
  let inputs = readFileSync(join('./inputs', 'day4.txt'), 'utf-8');
  let formattedInputs = inputs.split('\n');
  for (let [index, input] of formattedInputs.entries()) {
    if (index === 0) { // FIRST LINE
      let splittedValues = input.split(',');
      randomNumbers = splittedValues.map((number:string) => parseInt(number));
    } else if (input !== '') {
      let splittedValues = input.trim().split(/\s+/g);
      boards[boards.length - 1].push(splittedValues);
    } else {
      boards.push([] as any);
    }
  }
  return { boards, randomNumbers };
}

function calculateScore(matrix:any, number:number) {
  let sumOfNumbers = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] != 'X') {
        sumOfNumbers += parseInt(matrix[i][j]);
      }
    }
  }
  let finalScore = sumOfNumbers * number;
  return { score: sumOfNumbers, finalScore: finalScore };
}

function isCompletedLine(line:any) {
  const result = line.every((element:string) => {
    if (element === 'X') {
      return true;
    }
  });
  return result;
}

function checkColumn(matrix:any, col:number, randomNumber:number) {
  let column:any = [];
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][col] == randomNumber) {
      matrix[i][col] = 'X';
    }
    column.push(matrix[i][col]);
  }
  return isCompletedLine(column);
}

function checkRow(matrix:any, row:number, randomNumber:number) {
  for (let i = 0; i < matrix[row].length; i++) {
    if (matrix[row][i] == randomNumber) {
      matrix[row][i] = 'X';
    }
  }
  return isCompletedLine(matrix[row]);
}

function findWinner() {
  let { boards, randomNumbers } = getInputs();
  let completedRow = false;
  let completedColumn = false;
  let winners = [];

  // CHECK WINNER(S)
  for (let number of randomNumbers) {
    for (let i = 0; i < boards.length; i++) {
      completedRow = false;
      completedColumn = false;

      for (let line = 0; line < boards[i].length; line++) { // VERTICAL AND HORIZONTAL LINES
        completedRow = checkRow(boards[i], line, number);
        completedColumn = checkColumn(boards[i], line, number);
        if (completedRow || completedColumn) {
          winners.push({ index: i, matrix: boards[i], row: completedRow, column: completedColumn });
          break;
        }
      }
    }
    
    if (winners.length == 1) {
      console.log('Winner won with the number:', number);
      console.log(winners[0].matrix);
      let scores = calculateScore(winners[0].matrix, number);
      console.log('Score: ', scores.score);
      console.log('Final Score: ', scores.finalScore);
      break;
    } else if (winners.length > 1) {
      for (let winner of winners) {
        console.log('Winners with the number:', number);
        console.log('Total of winners: ', winners.length);
        console.log(winner.matrix);
        let scores = calculateScore(winner.matrix, number);
        console.log('Score: ', scores.score);
        console.log('Final Score: ', scores.finalScore);
      }
      break;
    }
  }
  if (winners.length == 0) {
    console.log('NO WINNERS');
  } 
}

findWinner();
