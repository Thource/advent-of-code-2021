export const parseInput = (input: string) => input.split('\n')

export const sampleInputString = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

const bracketPairs = {}
bracketPairs['('] = bracketPairs[')'] = {
  opener: '(',
  closer: ')',
  corruptionScore: 3,
  incompleteScore: 1,
}
bracketPairs['['] = bracketPairs[']'] = {
  opener: '[',
  closer: ']',
  corruptionScore: 57,
  incompleteScore: 2,
}
bracketPairs['{'] = bracketPairs['}'] = {
  opener: '{',
  closer: '}',
  corruptionScore: 1_197,
  incompleteScore: 3,
}
bracketPairs['<'] = bracketPairs['>'] = {
  opener: '<',
  closer: '>',
  corruptionScore: 25_137,
  incompleteScore: 4,
}

export const V1 = {
  sampleAnswer: 26397,
  scanForCorruptions(input: ReturnType<typeof parseInput>) {
    let corruptionScore = 0

    input.forEach(line => {
      const bracketStack: string[] = []

      line.split('').some(char => {
        const bracketInfo = bracketPairs[char]
        const lastBracket = bracketStack[bracketStack.length - 1]
        const isOpener = bracketInfo.opener === char

        if (isOpener || bracketInfo.opener === lastBracket) {
          if (isOpener) bracketStack.push(char)
          else bracketStack.pop()

          return false
        }

        corruptionScore += bracketInfo.corruptionScore
        return true
      })
    })

    return corruptionScore
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.scanForCorruptions(input)
  },
}

export const V2 = {
  sampleAnswer: 288957,
  scanForIncomplete(input: ReturnType<typeof parseInput>) {
    let incompleteScores = []

    input.forEach(line => {
      const bracketStack: string[] = []

      line.split('').some(char => {
        const bracketInfo = bracketPairs[char]
        const lastBracket = bracketStack[bracketStack.length - 1]
        const isOpener = bracketInfo.opener === char

        if (isOpener || bracketInfo.opener === lastBracket) {
          if (isOpener) bracketStack.push(char)
          else bracketStack.pop()

          return false
        }

        bracketStack.length = 0

        return true
      })
      if (!bracketStack.length) return

      incompleteScores.push(
        bracketStack
          .reverse()
          .reduce((a, b) => a * 5 + bracketPairs[b].incompleteScore, 0)
      )
    })

    return incompleteScores
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    const incompleteLines = V2.scanForIncomplete(input).sort((a, b) => a - b)
    return incompleteLines[Math.floor(incompleteLines.length / 2)]
  },
}
