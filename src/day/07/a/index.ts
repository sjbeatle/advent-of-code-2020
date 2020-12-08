import { bagRules } from './input';

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

const validBags: Rule[] = rules.filter(rule => {
  return getChildren(rule.color, []);
});

/**
 * Answer
 */
console.log(`There are ${validBags.length} bags that can contain my bag.`);


/**
 * Helper Functions
 */
function getChildren(color: string, tracker: string[]) {
  /**
   * Guards
   */
  if (tracker.includes(myBag)) {
    return true;
  }

  /**
   * Recursion
   */
  let children: Bag[] = [];

  rules.some(r => {
    if (r.color === color) {
      children = r.children;
      return true;
    };
  });

  const ruleChildren = children.map(child => {
    return child.color;
  });

  const validChildren: boolean[] = ruleChildren.map(child => {
    if (!tracker.includes(child)) { // we're not already looking for this color
      tracker.push(child);
      return getChildren(child, tracker);
    }
  });

  return validChildren.includes(true);
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
