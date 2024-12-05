export function memoryScan(data: string): number {
  const instructionRegex = /mul\(\d+,\d+\)/g;

  return data.matchAll(instructionRegex).reduce((acc, [mul]) => {
    return acc + runMul(mul);
  }, 0);
}

export function memoryScanWithToggles(data: string): any {
  const instructionRegex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  let doOp = true;

  return data.matchAll(instructionRegex).reduce((acc, curr) => {
    const instruction = curr[0];

    if (instruction === "do()") {
      doOp = true;
    } else if (instruction === `don't()`) {
      doOp = false;
    } else {
      if (doOp) return acc + runMul(instruction);
    }

    return acc;
  }, 0);
}

export function runMul(mulInstruction: string) {
  const [x, y] = mulInstruction.slice(4, -1).split(",");
  return parseInt(x) * parseInt(y);
}
