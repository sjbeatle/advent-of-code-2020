import { passports as rawPassports } from './input';

let validPassports = 0;
const splitPassports = rawPassports.split('\n\n');

/**
 * Create array of Passport objects
 */
const passports = splitPassports.map(p => {
  const kvs = p.replace(/\n/g, ' ').split(' ');
  const passport = {} as Passport;

  kvs.forEach(kv => {
    const kvSplit = kv.split(':');
    const k = kvSplit[0];
    const v = kvSplit[1];
    passport[k as ValidatorKeys] = v;
  });

  return passport;
});

/**
 * Validation functions
 */
const validators = {
  byr(val: string): boolean {
    if (!val) {
      return false;
    }

    const year = parseInt(val, 10);
    return 1920 <= year && year <= 2002;
  },

  iyr(val: string): boolean {
    if (!val) {
      return false;
    }

    const year = parseInt(val, 10);
    return 2010 <= year && year <= 2020;
  },

  eyr(val: string): boolean {
    if (!val) {
      return false;
    }

    const year = parseInt(val, 10);
    return 2020 <= year && year <= 2030;
  },

  hgt(val: string): boolean {
    if (!val || !/[cm,in]$/i.test(val)) {
      return false;
    }

    if (/cm$/i.test(val)) {
      const height = parseInt(val.replace('cm','').trim(), 10);
      return 150 <= height && height <= 193;
    } else if (/in$/i.test(val)) {
      const height = parseInt(val.replace('in', '').trim(), 10);
      return 59 <= height && height <= 76;
    }
  },

  hcl(val: string): boolean {
    if (!val || val.indexOf('#') !== 0) {
      return false;
    }

    const regExp = new RegExp(/^[a-z0-9]{6}$/, 'i');
    const chars = val.split('#')[1];
    return regExp.test(chars);
  },

  ecl(val: string): boolean {
    if (!val) {
      return false;
    }

    const validColors = [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ];
    return validColors.includes(val);
  },

  pid(val: string): boolean {
    if (!val) {
      return false;
    }

    const regExp = new RegExp(/^[0-9]{9}$/);
    return regExp.test(val);
  }
};

passports.forEach(p => {
  const validation: boolean[] = [];

  Object.keys(validators).forEach(k => {
    validation.push(validators[k as ValidatorKeys](p[k as ValidatorKeys] || ''));
  })

  if (!validation.includes(false)) {
    validPassports++;
  }
});

/**
 * Answer
 */
console.log(`There are ${validPassports} valid passports.`);


/****************************************/

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

enum ValidatorKeys {
  byr = 'byr',
  ecl = 'ecl',
  eyr = 'eyr',
  hcl = 'hcl',
  hgt = 'hgt',
  iyr = 'iyr',
  pid = 'pid',
}

enum PassportKeys {
  byr = 'byr',
  ecl = 'ecl',
  eyr = 'eyr',
  hcl = 'hcl',
  hgt = 'hgt',
  iyr = 'iyr',
  pid = 'pid',
  cid = 'cid',
}
