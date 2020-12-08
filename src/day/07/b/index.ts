import { bagRules } from '../a/input';

const myBag = 'shiny gold';
const rules: Rule[] = bagRules
  .map(rule => {
    const parentChildren = rule.split(' bags contain ');
    const color = parentChildren[0];
    const children = parentChildren[1]
      .slice(0, -1)
      .split(', ')
      .map((child): Bag => {
        const [count, ...color] = child.split(' ');

        return {
          count: parseInt(count, 10) || 0,
          color: color.join(' ').replace(/\sbags?$/, ''),
        };
      });

    return {
      color,
      children,
    };
  });

const myBagRule = rules.find(rule => rule.color === myBag);
const totals: number[] = [];
getTotals(myBagRule, 1);

const grandTotal = totals.reduce((a, b) => a + b) - 1;

/**
 * Answer
 */
console.log(`My shiny gold bag must contain ${grandTotal} other bags.`);


/**
 * Helper Functions
 */
function getTotals(rule: Rule, total: number) {
  totals.push(total);
  rule.children.forEach(child => {
    const bag = rules.find(rule => rule.color === child.color);

    if (bag) {
      getTotals(bag, child.count * total);
    }
  });
}


/**
 * Interfaces
 */
export interface Rule {
  color: string;
  children: Bag[];
}

interface Bag {
  color: string;
  count: number;
}
