export const parseInput = (input: string) => input.split(',').map(Number);

export const sampleInputString = `16,1,2,0,4,2,7,1,2,14`;

export const V1 = {
  sampleAnswer: 37,
  fuelToMid(input: ReturnType<typeof parseInput>) {
    let countToMid = Infinity;
    for (let i = Math.min(...input); i < Math.max(...input); i++) {
      countToMid = Math.min(countToMid, input.map((n) => Math.abs(i - n)).reduce((a, b) => a + b));
    }

    return countToMid;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.fuelToMid(input);
  }
};

export const V2 = {
  sampleAnswer: 168,
  fuelForDistance(dist: number) {
    return (dist * (dist + 1)) / 2;
  },
  fuelToMid(input: ReturnType<typeof parseInput>) {
    let countToMid = Infinity;
    for (let i = Math.min(...input); i < Math.max(...input); i++) {
      countToMid = Math.min(countToMid, input.map((n) => V2.fuelForDistance(Math.abs(i - n))).reduce((a, b) => a + b));
    }

    return countToMid;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2.fuelToMid(input);
  }
};
