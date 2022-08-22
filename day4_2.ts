import { readFileSync } from 'fs';
import { join } from 'path';

function getInputs() {
  let boards:any[][] = [];
  let randomNumbers:number[] = [];
  let inputs:string = readFileSync(join('./inputs', 'day4.txt'), 'utf-8');
  let formattedInputs:string[] = inputs.split('\n');
  for (let [index, input] of formattedInputs.entries()) {
    if (index === 0) {
      randomNumbers = input.split(',').map((number:string) => parseInt(number));
    } else if (input !== '') {
      let splittedValues:number[] = input.trim().split(/\s+/g).map((number:string) => parseInt(number));
      boards[boards.length - 1].push(splittedValues);
    } else {
      boards.push([] as any);
    }
  }
  return { boards, randomNumbers };
}

function calculateScore(matrix:any, number:number) {
  let sumOfNumbers:number = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] != 'X') {
        sumOfNumbers += parseInt(matrix[i][j]);
      }
    }
  }
  let finalScore:number = sumOfNumbers * number;
  return { score: sumOfNumbers, finalScore: finalScore };
}

function isCompletedLine(line:any) {
  const result:boolean = line.every((element:string) => {
    if (element === 'X') {
      return true;
    }
  });
  return result;
}

function checkColumn(matrix:any, col:number, randomNumber:number) {
  let column:any[] = [];
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
  let completedRow:boolean = false;
  let completedColumn:boolean = false;
  let winners:any[] = [];
  let lastNumber:any = null;

  // CHECK WINNER(S)
  for (let number of randomNumbers) {
    for (let i = 0; i < boards.length; i++) {
      completedRow = false;
      completedColumn = false;

      for (let line = 0; line < boards[i].length; line++) {  // VERTICAL AND HORIZONTAL LINES
        completedRow = checkRow(boards[i], line, number);
        completedColumn = checkColumn(boards[i], line, number);
        if ((completedRow || completedColumn) && winners.filter(e => e.index === i).length == 0) {
          winners.push({ index: i, matrix: boards[i], row: completedRow, column: completedColumn });
          lastNumber = number;
          break;
        }
      }
    }
    if (winners.length == boards.length) break;
  }

  if (winners.length == 0) console.log('NO WINNERS');
  else {
    console.log('Last "winner" "won" with the number:', lastNumber);
    console.log('Total of winners: ', winners.length);
    console.log('Matrix:', winners[winners.length - 1].matrix);
    let scores:any = calculateScore(winners[winners.length - 1].matrix, lastNumber);
    console.log('Score: ', scores.score);
    console.log('Final Score: ', scores.finalScore);
  }

}

findWinner();
