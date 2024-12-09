import { full } from "./data.ts";

const [r, o] = full.split("\n\n");
const rules = r.split("\n").map((pair) =>
  pair.split("|").map((c) => parseInt(c))
);
const updates = o.split("\n").map((update) =>
  update.split(",").map((c) => parseInt(c))
);
const rulesRef = new Map();
const getRule = (n: number) =>
  rulesRef.get(n) || { before: new Set(), after: new Set() };
const setRules = (
  n: number,
  { before, after }: { before?: number; after?: number },
) => {
  const rule = getRule(n);
  if (Number.isInteger(before)) {
    rule.before.add(before);
  }
  if (Number.isInteger(after)) {
    rule.after.add(after);
  }
  rulesRef.set(n, rule);
};

for (const [before, after] of rules) {
  setRules(before, { after });
  setRules(after, { before });
}

let total = 0;

for (const update of updates) {
  const positions = new Map();

  for (const [index, number] of update.entries()) {
    positions.set(number, index);
  }

  const inCorrectOrder = update.every((n) => {
    const position = positions.get(n);
    const { before, after } = getRule(n);
    for (const b of before) {
      if (!positions.has(b)) continue;
      if (positions.get(b) > position) return false;
    }
    for (const a of after) {
      if (!positions.has(a)) continue;
      if (positions.get(a) < position) return false;
    }
    return true;
  });

  if (inCorrectOrder /* SWAP for part 1*/) continue;
  update.sort((a, b) => {
    const rule = getRule(a);
    if (rule.before.has(b)) return 1;
    if (rule.after.has(b)) return -1;
    return 0;
  });
  total += update?.at(update.length / 2) || 0;
}

console.log(total);
