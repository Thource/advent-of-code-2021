export const parseInput = (input: string) => input.split("\n");

export const sampleInputString = ``;

export const V1 = {
  sampleAnswer: 150,
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1;
  }
};

export const V2 = {
  sampleAnswer: undefined,
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2;
  }
};
