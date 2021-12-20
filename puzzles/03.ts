export const parseInput = (input: string) => input.split("\n");

export const sampleInputString = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

export const V1 = {
  sampleAnswer: 198,
  getMostCommonBit(input: string[], bitIndex: number, infBit: 0 | 1) {
    const bitCount = input.filter((bin) => parseInt(bin[bitIndex], 10) === infBit).length;
    return bitCount === input.length / 2 ? infBit : bitCount > input.length / 2 ? 1 : 0;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    let gammaBin = '';
    let epsilonBin = '';

    for (let i = 0; i < input[0].length; i++) {
      gammaBin += V1.getMostCommonBit(input, i, 1);
      epsilonBin += V1.getMostCommonBit(input, i, 0);
    }

    return parseInt(gammaBin, 2) * parseInt(epsilonBin, 2);
  }
};

export const V2 = {
  sampleAnswer: 230,
  eliminate(_input: string[], bit: 0 | 1) {
    let input = JSON.parse(JSON.stringify(_input)) as string[];
    let bitIndex = 0;
  
    while (input.length > 1) {
      const commonBit = V1.getMostCommonBit(input, bitIndex, bit);
      input = input.filter((bin) => parseInt(bin[bitIndex], 10) === commonBit);
      bitIndex++;
    }
  
    return parseInt(input[0], 2);
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2.eliminate(input, 0) * V2.eliminate(input, 1);
  }
};

