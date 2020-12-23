import { example, exampleString, initProgram, initProgramString } from './input';

const memoryBank: Map<bigint, bigint> = new Map()

initProgram.forEach(d => {
  const mask = getMask(d);
  const memory = getMemory(d);
  // console.log('>> TESTING >> memory', memory);
  // console.log('>> TESTING >> memory.length', memory.length);

  memory.forEach(b => {
    const bitMask = getBitMask(mask, b.binary);
    // console.log('>> TESTING >> bitMask', bitMask);
    const addresses = Array.from(getAllPossibilities(bitMask)).map(a => BigInt(parseInt(a as string, 2)));
    addresses.forEach(a => {
      memoryBank.set(a, BigInt(parseInt(b.value, 10)))
    });
  });
});
// console.log('>> TESTING >> memoryBank', Array.from(memoryBank.values()).sort())
console.log(Number([...memoryBank.values()].reduce((a, b) => a + b)));

// const parseMemoryBankValues = Object.values(memoryBank);
// console.log('>> TESTING >> parseMemoryBankValues', parseMemoryBankValues);
// @ts-ignore
// console.log(parseMemoryBankValues.reduce((a, b) => a + b));
// wrong 173952668892444 too high
// wrong 43015718654456 too high
// wrong 4316693884355
// CORRECT!! 4832039794082
// wrong 364373604099 too low
// wrong 8931144589267 didn't state high or low

function getAllPossibilities(b: string) {
  const possibilities: string[] = [];

  b.split('').forEach((d, i) => {
    if (d === 'X') {
      const bit1 = replaceAt(b, i, '1');
      const bit0 = replaceAt(b, i, '0');
      possibilities.push(bit1.replace(/X/g, '1').replace(/^0+(?!$)/, ""));
      possibilities.push(bit1.replace(/X/g, '0').replace(/^0+(?!$)/, ""));
      possibilities.push(bit0.replace(/X/g, '1').replace(/^0+(?!$)/, ""));
      possibilities.push(bit0.replace(/X/g, '0').replace(/^0+(?!$)/, ""));
    }
  });

  return new Set([...possibilities]);
}

function replaceAt(orig: string, index: number, replacement: string) {
  return orig.substr(0, index) + replacement + orig.substr(index + replacement.length);
}

function getBitMask(mask: string, b: string) {
  const bL = b.length;
  const maskL = mask.length;
  let newBit = '';
  let i = 1;
  while (i < maskL) {
    const bitMask = mask[maskL - i];
    switch (bitMask) {
      case '0':
        newBit = (b[bL - i] || 0) + newBit;
        break;

      case '1':
        newBit = '1' + newBit;
        break;

      default:
        newBit = 'X' + newBit;
        break;
    }
    i++;
  }
  return newBit.replace(/^0+(?!$)/, "");
}

function splitByNewLine(m: string): string[] {
  return m.split(/\n/g);
}

function getMask(m: string): string {
  return splitByNewLine(m)[0].split('mask =')[1];
}

function getMemory(m: string) {
  const memory = splitByNewLine(m).slice(1);
  return memory.map(a => getMemoryByLine(a));
}

function getMemoryByLine(m: string) {
  const regex = /mem\[(\d*)\] = (\d*)/;
  const addAndBinary = regex.exec(m);
  return {
    value: addAndBinary[2],
    binary: (parseInt(addAndBinary[1], 10)).toString(2),
  };
}






/**
 * CHEAT 2
 */
const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) =>
    x.startsWith("mask")
      ? x.match(/^mask \= (.*)/)[1]
      : x
          .match(/mem\[(\d+)\] \= (\d+)/)
          .slice(1)
          .map(BigInt),
  )

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const memory: Map<bigint, bigint> = new Map()

  let maskOR = 0n
  let floatsPos: bigint[] = []

  input.forEach((item) => {
    if (typeof item === "string") {
      maskOR = BigInt(parseInt(item.replace(/X/g, "0"), 2))
      // floatsPos = Array.from(item.matchAll(/X/g), (x) => BigInt(x.index))
      floatsPos = Array.from(item).map((d, i) => d === 'X' ? BigInt(i) : BigInt(-1)).filter(d => d !== BigInt(-1));
    } else {
      const [address, value] = item
      const addr = address | maskOR
      const combinationsSize = 2 ** floatsPos.length

      for (let i = 0n; i < combinationsSize; i++) {
        let maskXOR = 0n

        floatsPos.forEach((pos, index) => {
          const pow = BigInt(index)
          const isOn = (i & (2n ** pow)) !== 0n

          if (isOn) {
            maskXOR |= 1n << (36n - pos - 1n)
          }
        })

        // console.log('>> TESTING >> addr ^ maskXOR, value', addr ^ maskXOR, value);
        memory.set(addr ^ maskXOR, value)
      }
    }
  })

  console.log('>> TESTING >> Array.from(memory.values())', Array.from(memory.values()).sort());
  return Number([...memory.values()].reduce((a, b) => a + b))
}

    console.log(goB(
      initProgramString.trim(),
    ));
