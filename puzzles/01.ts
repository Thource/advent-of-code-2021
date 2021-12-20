export const parseInput = (input: string) => input.split("\n").map(Number);

export const sampleInputString = `199
200
208
210
200
207
240
269
260
263`;

export const V1 = {
  sampleAnswer: 7,
  getNumberOfIncrements(arr: number[]) {
    return arr.filter((v, i, a) => i > 0 && a[i - 1] < v).length
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.getNumberOfIncrements(input);
  }
};

export const V2 = {
  sampleAnswer: 5,
  getSlidingWindow(arr: number[], ind: number, windowSize: number) {
    return arr.slice(ind, ind + windowSize).reduce((a, b) => a + b, 0);
  },
  getNumberOfIncrements(arr: number[]) {
    return arr.filter((_, i, a) => { 
      return i + 3 < a.length && V2.getSlidingWindow(a, i, 3) < V2.getSlidingWindow(a, i + 1, 3)
    }).length;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2.getNumberOfIncrements(input);
  }
};

