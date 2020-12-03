import { policyPasswords } from './input';

interface Policy {
  indices: number[];
  char: string;
}

interface Valid {
  policyPassword: string;
  index: number;
}

function getPolicy(pp: string): Policy {
  const prefix = pp.split(':')[0];
  const policyDetails = prefix.split(' ');
  const indices = policyDetails[0].split('-');

  return {
    indices: [ parseInt(indices[0].trim()) - 1, parseInt(indices[1].trim()) - 1 ],
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
  let count = 0;

  policy.indices.forEach(index => {
    if (password[index] === policy.char) {
      count++;
    }
  });

  if (count === 1) {
    validPolicyPasswords.push({
      policyPassword: pp,
      index: i,
    })
  }
});

// console.log('>> TESTING >> validPolicyPasswords', validPolicyPasswords);
console.log(`There are ${validPolicyPasswords.length} valid passwords and ${policyPasswords.length - validPolicyPasswords.length} invalid passwords.`);
