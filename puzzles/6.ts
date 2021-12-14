export const parseInput = (input: string) => input.split(',').map(Number);

export const sampleInputString = `3,4,3,1,2`;

export const V1 = {
  sampleAnswer: 5934,
  getFishAfterDays(oInput: ReturnType<typeof parseInput>, days) {
    const fishByDaysLeft = [];
    oInput.forEach((d) => fishByDaysLeft[d] = (fishByDaysLeft[d] || 0) + 1)

    for (let day = 0; day < days; day++) {
      let newFish = 0;
      for (let d = 0; d <= 8; d++) {
        const fish = fishByDaysLeft[d] || 0;
        if (d === 0) {
          newFish = fish;
          continue;
        }

        fishByDaysLeft[d - 1] = fish;
      }
      fishByDaysLeft[8] = newFish;
      fishByDaysLeft[6] = (fishByDaysLeft[6] || 0) + newFish;
    }

    return fishByDaysLeft.reduce((a, b) => a + b);
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.getFishAfterDays(input, 80);
  }
};

export const V2 = {
  sampleAnswer: 26984457539,
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.getFishAfterDays(input, 256);
  }
};
