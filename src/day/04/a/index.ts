import { passports as rawPassports } from './input';

let validPassports = 0;
const splitPassports = rawPassports.split('\n\n');
const passports = splitPassports.map(p => {
  const kvs = p.replace(/\n/g, ' ').split(' ');
  const passport = {} as Passport;

  kvs.forEach(kv => {
    const kvSplit = kv.split(':');
    const k = kvSplit[0];
    const v = kvSplit[1];
    passport[k as PassportKeys] = v;
  });

  return passport;
});

passports.forEach(p => {
  const kCount = Object.keys(p).length;
  if (kCount === 8 || (kCount === 7 && !p.cid)) {
    validPassports++;
  }
});

console.log(`There are ${validPassports} valid passports.`);

interface Passport {
  byr: string;
  cid?: string;
  ecl: string;
  eyr: string;
  hcl: string;
  hgt: string;
  iyr: string;
  pid: string;
}

enum PassportKeys {
  cid = 'cid',
  byr = 'byr',
  ecl = 'ecl',
  eyr = 'eyr',
  hcl = 'hcl',
  hgt = 'hgt',
  iyr = 'iyr',
  pid = 'pid',
}
