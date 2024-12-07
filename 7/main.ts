import { example, full } from "./data.ts";

type Equation = {
    answer: number;
    operands: number[];
};

type Operator = (n1: number, n2: number) => number;

const input = example;

const equations: Equation[] = input.split('\n').map(eq => {
    const [answer, numbers] = eq.split(': ');
    return { answer: parseInt(answer), operands: numbers.split(' ').map(n => parseInt(n))}
});

const validEquations = equations.filter(validEquationExists);

function validEquationExists({answer, operands}: Equation): boolean {
    const operatorCount = operands.length - 1;
    for(let i = 0; i < 2 ** operatorCount; i++) {
        const operators = permutateOperators(operatorCount, i);
        const [first, ...rest] = operands
        const total = rest.reduce((total, n) => operators.pop()!(total, n), first)
        if (total === answer) return true;
    }
    return false;
}

function permutateOperators(length, iteration): Operator[] {
    return iteration.toString(2);
    //console.log([0, 1, 2, 3, 4, 5].map(n => n.toString(2)).map(n => n.padStart(4 - n.length, '0')));
}

console.log(validEquations);