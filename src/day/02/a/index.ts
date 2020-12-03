import { policyPasswords } from './input';

interface Policy {
  min: number;
  max: number;
  char: string;
}

interface Valid {
  policyPassword: string;
  index: number;
}

function getPolicy(pp: string): Policy {
  const prefix = pp.split(':')[0];
  const policyDetails = prefix.split(' ');
  const range = policyDetails[0].split('-');

  return {
    min: parseInt(range[0].trim()),
    max: parseInt(range[1].trim()),
    char: policyDetails[1].toLowerCase().trim(),
  }
}

function getPassword(pp: string): string {
  return pp.split(':')[1].toLowerCase().trim();
}

let validPolicyPasswords: Valid[] = [];

policyPasswords.forEach((pp, i) => {
  const policy = getPolicy(pp);
  const password = getPassword(pp);
  const requiredCharCount = password.split(policy.char).length - 1;
  const isValid = policy.min <= requiredCharCount && requiredCharCount <= policy.max;

  if (isValid) {
    validPolicyPasswords.push({
      policyPassword: pp,
      index: i,
    })
  }
});

// console.log('>> TESTING >> validPolicyPasswords', validPolicyPasswords);
console.log(`There are ${validPolicyPasswords.length} valid passwords and ${policyPasswords.length - validPolicyPasswords.length} invalid passwords.`);
