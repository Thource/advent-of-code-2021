export const parseInput = (input: string) =>
  input.split('\n').map(x => x.split('').map(Number))

export const sampleInputString = `2199943210
3987894921
9856789892
8767896789
9899965678`

export const V1 = {
  sampleAnswer: 15,
  getHeight(input: ReturnType<typeof parseInput>, x: number, y: number) {
    const height = (input[y] || [])[x]
    if (height !== undefined) return height
    return 1_000
  },
  getAdjacentHeights(
    input: ReturnType<typeof parseInput>,
    x: number,
    y: number
  ) {
    return [
      V1.getHeight(input, x - 1, y),
      V1.getHeight(input, x + 1, y),
      V1.getHeight(input, x, y - 1),
      V1.getHeight(input, x, y + 1),
    ].filter(x => x !== undefined)
  },
  findLowPoint(input: ReturnType<typeof parseInput>, x: number, y: number) {
    const height = V1.getHeight(input, x, y)
    const lowestAdjacentHeight = Math.min(...V1.getAdjacentHeights(input, x, y))
    if (height >= lowestAdjacentHeight) return

    return height
  },
  findLowPoints(input: ReturnType<typeof parseInput>) {
    const lowPoints: { x: number; y: number; height: number }[] = []

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const height = V1.findLowPoint(input, x, y)
        if (height !== undefined) lowPoints.push({ x, y, height })
      }
    }

    return lowPoints
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    const lowPoints = V1.findLowPoints(input)
    return lowPoints.reduce((a, b) => a + b.height + 1, 0)
  },
}

export const V2 = {
  sampleAnswer: 1134,
  getBasinTiles(
    input: ReturnType<typeof parseInput>,
    x: number,
    y: number,
    tiles: string[] = []
  ) {
    const stringCoords = `${x},${y}`
    if (tiles.includes(stringCoords)) return
    if (V1.getHeight(input, x, y) >= 9) return

    tiles.push(stringCoords)

    V2.getBasinTiles(input, x - 1, y, tiles)
    V2.getBasinTiles(input, x + 1, y, tiles)
    V2.getBasinTiles(input, x, y - 1, tiles)
    V2.getBasinTiles(input, x, y + 1, tiles)

    return tiles
  },
  getBasins(input: ReturnType<typeof parseInput>) {
    return V1.findLowPoints(input).map(lowPoint => {
      return {
        lowPoint,
        tiles: V2.getBasinTiles(input, lowPoint.x, lowPoint.y),
      }
    })
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    const basins = V2.getBasins(input).sort(
      (a, b) => b.tiles.length - a.tiles.length
    )

    return (
      basins[0].tiles.length * basins[1].tiles.length * basins[2].tiles.length
    )
  },
}
