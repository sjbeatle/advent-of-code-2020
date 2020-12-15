import { example, initProgram } from './input';

const memoryBank: any = {};

initProgram.forEach(d => {
  const mask = getMask(d);
  const memory = getMemory(d);

  memory.forEach(b => {
    memoryBank[b.address] = getBitMask(mask, b.binary);
  });
});

const parseMemoryBankValues = Object.values(memoryBank).map(a => parseInt(a as string, 2));

console.log('>> TESTING >> parseMemoryBankValues', parseMemoryBankValues.reduce((a, b) => a + b));

function getBitMask(mask: string, b: string) {
  const bL = b.length;
  const maskL = mask.length;
  let newBit = '';
  let i = 1;
  while (i < maskL) {
    const maskBit = mask[maskL - i];
    switch (maskBit) {
      case 'X':
        newBit = (b[bL - i] || 0) + newBit;
        break;

      default:
        newBit = maskBit + newBit;
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
    address: addAndBinary[1],
    binary: (parseInt(addAndBinary[2], 10)).toString(2),
  };
}
