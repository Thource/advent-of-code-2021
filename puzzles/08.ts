class Display {
  jumbledDigits: [string, string, string, string, string, string, string, string, string, string];
  jumbledDisplay: [string, string, string, string];
  characterMap: {[realChar: string]: string} = {};
  
  constructor(inputString: string) {
    const inputStrings = inputString.split(' | ');
    this.jumbledDigits = inputStrings[0].split(' ') as [string, string, string, string, string, string, string, string, string, string];
    this.jumbledDisplay = inputStrings[1].split(' ') as [string, string, string, string];
  }

  rewire() {
    const possibleDigits: {[char: string]: string[]} = {};

    const digit1 = this.jumbledDigits.find(x => x.length === 2);
    const digit7 = this.jumbledDigits.find(x => x.length === 3);
    const digit4 = this.jumbledDigits.find(x => x.length === 4);
    const digit8 = this.jumbledDigits.find(x => x.length === 7);

    V2.findCharacters(possibleDigits, digit1);
    V2.findCharacters(possibleDigits, digit7);
    V2.findCharacters(possibleDigits, digit4);
    V2.findCharacters(possibleDigits, digit8);

    const digit5 = this.jumbledDigits.find(x => x.length === 5 &&
      V2.getIntersections(x.split(''), possibleDigits['b']).length === 2 &&
      V2.getIntersections(x.split(''), possibleDigits['f']).length === 1)
    const charF = V2.getIntersections(digit5.split(''), possibleDigits['f'])[0];
    possibleDigits['c'] = possibleDigits['f'].filter(x => x != charF);
    possibleDigits['f'] = [charF];
    const charG = V2.getIntersections(digit5.split(''), possibleDigits['g'])[0];
    possibleDigits['e'] = possibleDigits['g'].filter(x => x != charG);
    possibleDigits['g'] = [charG];

    const digit0 = this.jumbledDigits.find(x => x.length === 6 &&
      V2.getIntersections(x.split(''), possibleDigits['b']).length === 1)
    const charB = V2.getIntersections(digit0.split(''), possibleDigits['b'])[0];
    possibleDigits['d'] = possibleDigits['b'].filter(x => x != charB);
    possibleDigits['b'] = [charB];

    this.characterMap = {
      a: possibleDigits['a'][0],
      b: possibleDigits['b'][0],
      c: possibleDigits['c'][0],
      d: possibleDigits['d'][0],
      e: possibleDigits['e'][0],
      f: possibleDigits['f'][0],
      g: possibleDigits['g'][0],
    };
  }

  getCharacter(jumble: string) {
    if (jumble.length === 2) return '1';
    if (jumble.length === 3) return '7';
    if (jumble.length === 4) return '4';
    if (jumble.length === 7) return '8';
    if (!jumble.includes(this.characterMap['d'])) return '0';
    if (jumble.length === 6) return jumble.includes(this.characterMap['c']) ? '9' : '6';
    if (jumble.includes(this.characterMap['c'])) {
      return jumble.includes(this.characterMap['f']) ? '3' : '2';
    } else {
      return '5';
    }
  }

  getDisplayedNumber() {
    return Number(this.jumbledDisplay.map(jumble => this.getCharacter(jumble)).join(''))
  }
}

export const parseInput = (input: string) => input.split("\n").map(x => new Display(x));

export const sampleInputString = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

export const V1 = {
  sampleAnswer: 26,
  countUniqueDigits(display: Display) {
    return display.jumbledDisplay.map(x => x.length).filter(x => [2, 3, 4, 7].indexOf(x) >= 0).length;
  },
  countAllUniqueDigits(input: ReturnType<typeof parseInput>) {
    return input.reduce((a, b) => a + V1.countUniqueDigits(b), 0)
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    return V1.countAllUniqueDigits(input);
  }
};

const DIGIT_CHARACTERS = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
const UNIQUE_DIGITS = {2: 1, 4: 4, 3: 7, 7: 8};

export const V2 = {
  sampleAnswer: 61229,
  findCharacters(possibleDigits: {[char: string]: string[]}, jumbled: string) {
    const realCharacters = DIGIT_CHARACTERS[UNIQUE_DIGITS[jumbled.length] || 8];

    const filteredJumble = [];
    const filteredRealCharacters = [];
    jumbled.split('').forEach(c => {
      if (Object.values(possibleDigits).flat().indexOf(c) >= 0) return;

      filteredJumble.push(c);
    });
    realCharacters.split('').forEach(c => {
      if (Object.keys(possibleDigits).flat().indexOf(c) >= 0) return;

      filteredRealCharacters.push(c);
    });

    if (filteredJumble.length > 0 && filteredRealCharacters.length > 0) {
      filteredRealCharacters.forEach((c) => {
        if (possibleDigits[c]) return;
  
        possibleDigits[c] = filteredJumble;
      });
    }
  },
  getIntersections(a: string[], b: string[]) {
    return a.filter((x) => b.indexOf(x) >= 0);
  },
  getAnswer(input: ReturnType<typeof parseInput>) {
    let sum = 0;

    input.forEach((display) => {
      display.rewire();
      sum += display.getDisplayedNumber();
    });

    return sum;
  }
};
