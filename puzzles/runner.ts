import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

interface PuzzleDataV {
  sampleAnswer: any;
  getAnswer: any;
}

interface PuzzleData {
  sampleInputString: string;
  parseInput: (input: string) => any;
  V1: PuzzleDataV;
  V2: PuzzleDataV;
}

const day = process.argv.slice(2)[0];
if (!day) {
  console.log('Please specify a day to run.');
  process.exit(1);
}

const detailedAssert = (a, b) => {
  if (a === b) return;

  console.log(`Assert failed: ${a} !== ${b}`)
  process.exit(1);
}

const puzzleData = require(`./${day}.ts`) as PuzzleData;
detailedAssert(puzzleData.V1.getAnswer(puzzleData.parseInput(puzzleData.sampleInputString)), puzzleData.V1.sampleAnswer);

if (puzzleData.V2.sampleAnswer !== undefined)
  detailedAssert(puzzleData.V2.getAnswer(puzzleData.parseInput(puzzleData.sampleInputString)), puzzleData.V2.sampleAnswer);

const rawInput = fs.readFileSync(path.join(__dirname, `/inputs/${day}.txt`)).toString();
console.log(`Part 1: ${puzzleData.V1.getAnswer(puzzleData.parseInput(rawInput))}`);

if (puzzleData.V2.sampleAnswer !== undefined)
  console.log(`Part 2: ${puzzleData.V2.getAnswer(puzzleData.parseInput(rawInput))}`);
