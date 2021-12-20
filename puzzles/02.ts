type Command = ['up' | 'down' | 'forward', number];

export const sampleInputString = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

export const parseInput = (input: string) => input.split("\n").map(s => [s.split(/\s+/)[0], Number(s.split(/\s+/)[1])]) as Command[];

export const V1 = {
  sampleAnswer: 150,
  parseCommandList(commandList: Command[]) {
    let xPos = 0;
    let yPos = 0;
    commandList.forEach(([dir, num]) => {
      if (dir === 'forward') {
        xPos += num;
      } else if (dir === 'up') {
        yPos -= num;
      } else {
        yPos += num;
      }
    })

    return xPos * yPos;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.parseCommandList(input);
  }
};

export const V2 = {
  sampleAnswer: 900,
  parseCommandList(commandList: Command[]) {
    let xPos = 0;
    let yPos = 0;
    let aim = 0;
    commandList.forEach(([dir, num]) => {
      if (dir === 'forward') {
        xPos += num;
        yPos += aim * num;
      } else if (dir === 'up') {
        aim -= num;
      } else {
        aim += num;
      }
    })

    return xPos * yPos;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V2.parseCommandList(input);
  }
};
