export function totalDistance(input: string) {
  let totalDifference = 0;

  const [leftColumn, rightColumn] = createColumnsFromInput(input);

  leftColumn.sort();
  rightColumn.sort();

  for (let i = 0; i < leftColumn.length; i++) {
    totalDifference += Math.abs(leftColumn[i] - rightColumn[i]);
  }

  return totalDifference;
}

export function similarityScore(input: string) {
  const [leftColumn, rightColumn] = createColumnsFromInput(input);

  const rightFrequencies = frequencyMap(rightColumn);

  const score = leftColumn.reduce((prev, curr) => {
    return prev + curr * (rightFrequencies.get(curr) || 0);
  }, 0);

  return score;
}

const frequencyMap = (numbers: number[]): Map<number, number> => {
  const frequencyMap = new Map<number, number>();

  for (const num of numbers) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  return frequencyMap;
};

const createColumnsFromInput = (input: string): [number[], number[]] => {
  const leftColumn: number[] = [];
  const rightColumn: number[] = [];

  input.split(`\n`).forEach((line: string) => {
    const [leftNum, rightNum] = line.split(`   `);
    leftColumn.push(parseInt(leftNum));
    rightColumn.push(parseInt(rightNum));
  });

  return [leftColumn, rightColumn];
};
