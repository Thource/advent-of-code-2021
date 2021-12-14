const turnArray2D = <T extends unknown>(arr: T[], size: number) => {
  return arr.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) 
    : rows[rows.length-1].push(key)) && rows, []);
}

class BingoBoard {
  numberMap: [number, number][] = [];
  numbers: number[][];
  rowChecks = [0, 0, 0, 0, 0];
  columnChecks = [0, 0, 0, 0, 0];
  uncheckedSum: number;
  hasWon = false;

  constructor(numbers: number[]) {
    this.numbers = turnArray2D(numbers, 5);
    numbers.forEach((num, ind) => {
      const row = Math.floor(ind / 5);
      const column = ind % 5;

      this.numberMap[num] = [row, column];
    });
    this.uncheckedSum = numbers.reduce((a, b) => a + b);
  }

  getNumberPosition(num: number) {
    return this.numberMap[num];
  }

  checkOff(num: number) {
    if (this.hasWon) return false;

    const position = this.getNumberPosition(num);
    if (!position) return false;

    const [row, column] = position;
    this.rowChecks[row]++;
    this.columnChecks[column]++;
    this.uncheckedSum -= num;

    return true;
  }

  checkForWin(lastNum: number) {
    if (this.hasWon) return false;

    const position = this.getNumberPosition(lastNum);
    if (!position) return false;

    const [row, column] = position;
    if (this.rowChecks[row] === 5 || this.columnChecks[column] === 5) {
      this.hasWon = true;
      return this.uncheckedSum * lastNum;
    } else {
      return false;
    }
  }
}

interface BingoData {
  numbers: number[];
  boards: BingoBoard[];
}

export const parseInput = (input: string) => {
  const inputLines = input.split("\n\n").map(x => x.trim());
  const numbers = inputLines.shift().split(',').map(Number);
  const boardNumberArray = inputLines.map((s) => s.split(/\s+/).map(Number))
  const boards = boardNumberArray.map((a) => new BingoBoard(a));

  return { numbers, boards } as BingoData;
}

export const sampleInputString = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

export const V1 = {
  sampleAnswer: 4512,
  playBingo(input: BingoData) {
    let winCode;
    input.numbers.some((num, numIndex) => {
      input.boards.some((board, boardIndex) => {
        if (!board.checkOff(num)) return false;

        const code = board.checkForWin(num);
        if (code === false) return false;

        winCode = code;
        return true;
      });

      return winCode !== undefined;
    });

    return winCode;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.playBingo(input);
  }
};

export const V2 = {
  sampleAnswer: 1924,
  playBingo(input: BingoData) {
    let loseCode = -1;
    input.numbers.forEach((num) => {
      input.boards.forEach((board) => {
        if (!board.checkOff(num)) return false;

        const code = board.checkForWin(num);
        if (code === false) return false;

        loseCode = code;
      });
    });

    return loseCode;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2.playBingo(input);
  }
};
