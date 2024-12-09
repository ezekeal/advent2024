import { example } from "./data.ts";

type Equation = {
  answer: number;
  operands: number[];
};

type Operator = (n1: number, n2: number) => number;

const operations: Map<string, Operator> = new Map([
  ["0", add],
  ["1", multiply],
  ["2", concat],
]);

const input = example;

const equations: Equation[] = input.split("\n").map((eq) => {
  const [answer, numbers] = eq.split(": ");
  return {
    answer: parseInt(answer),
    operands: numbers.split(" ").map((n) => parseInt(n)),
  };
});

function validEquationExists(
  { answer, operands }: Equation,
  operatorTypes: number,
): boolean {
  const operatorCount = operands.length - 1;
  for (let i = 0; i < operatorTypes ** operatorCount; i++) {
    const operatorIds = permutateOperators(operatorCount, i, operatorTypes);
    const [first, ...rest] = operands;
    const total = rest.reduce(
      (total, n) => operations.get(operatorIds.pop()!)!(total, n),
      first,
    );
    if (total > answer) return false;
    if (total === answer) return true;
  }
  return false;
}

function permutateOperators(
  length: number,
  iteration: number,
  operatorTypes: number,
): string[] {
  let operatorMap = iteration.toString(operatorTypes);
  operatorMap = operatorMap.padStart(length, "0");
  return operatorMap.split("");
}

function add(x: number, y: number): number {
  return x + y;
}
function multiply(x: number, y: number): number {
  return x * y;
}
function concat(x: number, y: number): number {
  return parseInt(`${x}${y}`);
}

console.log(
  equations.filter((eq) => validEquationExists(eq, 3)).reduce(
    (total, { answer }) => answer + total,
    0,
  ),
);
