export const parseInput = (input: string) =>
  input.split('\n').map(x => x.split('').map(Number))

export const sampleInputString = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

export const V1 = {
  sampleAnswer: 1656,
  flash(input: ReturnType<typeof parseInput>, x: number, y: number) {
    let flashes = 1

    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
        if (ox === 0 && oy === 0) continue

        flashes += V1.lightenUp(input, x + ox, y + oy)
      }
    }

    return flashes
  },
  lightenUp(input: ReturnType<typeof parseInput>, x: number, y: number) {
    const row = input[y] || []
    if (row[x] === undefined || row[x] === 10) return 0
    if (row[x]++ === 9) return V1.flash(input, x, y)
    return 0
  },
  tick(input: ReturnType<typeof parseInput>) {
    let flashes = 0

    for (let y = 0; y < input.length; y++) {
      const row = input[y]
      for (let x = 0; x < row.length; x++) {
        flashes += V1.lightenUp(input, x, y)
      }
    }

    for (let y = 0; y < input.length; y++) {
      const row = input[y]
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 10) row[x] = 0
      }
    }

    return flashes
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    let flashes = 0

    for (let i = 0; i < 100; i++) {
      flashes += V1.tick(input)
    }

    return flashes
  },
}

export const V2 = {
  sampleAnswer: 195,
  getAnswer(input: ReturnType<typeof parseInput>) {
    let ticks = 0
    while (++ticks && V1.tick(input) !== 100) {}

    return ticks
  },
}
