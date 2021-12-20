export const parseInput = (input: string) => input.split("\n").map((i) => {
  const pairs = i.split(' -> ');
  const [x1, y1] = pairs[0].split(',').map(Number);
  const [x2, y2] = pairs[1].split(',').map(Number);

  return { x1, y1, x2, y2 };
});

export const sampleInputString = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

export const V1 = {
  sampleAnswer: 5,
  getGrid(input: ReturnType<typeof parseInput>, includeDiagonals = false) {
    const grid: number[][] = [];
    input.forEach(({ x1, y1, x2, y2 }) => {
      const isSimple = x1 === x2 || y1 === y2;
      if (!includeDiagonals && !isSimple) return;

      if (isSimple) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          if (!grid[x]) grid[x] = [];
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            grid[x][y] = (grid[x][y] || 0) + 1;
          }
        }
      } else {
        let x = x1;
        let y = y1;
        const xDirection = x1 - x2 > 0 ? -1 : 1;
        const yDirection = y1 - y2 > 0 ? -1 : 1;
        while (x !== x2 + xDirection) {
          if (!grid[x]) grid[x] = [];
          grid[x][y] = (grid[x][y] || 0) + 1;

          x += xDirection;
          y += yDirection;
        }
      }
    });

    return grid;
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.getGrid(input).flat().reduce((a, b) => a + (b > 1 ? 1 : 0), 0);
  }
};

export const V2 = {
  sampleAnswer: 12,
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.getGrid(input, true).flat().reduce((a, b) => a + (b > 1 ? 1 : 0), 0);
  }
};
