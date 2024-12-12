import { parseArgs } from "@std/cli/parse-args";
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});

const data = Deno.readTextFileSync(dataFile);

function expand(input: string): string[] {
  const nextFileName = fileNameGenerator();
  const isFile = fileToggle();
  const expanded = [];
  for (const c of input) {
    const multiplier = parseInt(c);
    const nextBlock = new Array(multiplier);
    const nextValue = isFile.next().value ? nextFileName.next().value : ".";
    nextBlock.fill(nextValue);
    expanded.push(nextBlock);
  }
  return expanded.flat();
}

function shift(input: string[]): string[] {
  const values = input.slice();
  const shiftedValues = reverseQueueWithIndex(values);
  let nextShiftedValue = shiftedValues.next().value;
  for (const [i, c] of values.entries()) {
    const [sValueIndex, sValue] = nextShiftedValue;
    if (sValueIndex <= i) {
      return values.fill(".", i + 1);
    }
    if (c !== ".") continue;
    values[i] = sValue;
    nextShiftedValue = shiftedValues.next().value;
  }
  return values;
}

function shiftWholeFiles(input: string): [number, string][] {
  const nextFileName = fileNameGenerator();
  const isFile = fileToggle();
  const expansions: [number, string][] = input.split("").map((size) => [
    parseInt(size),
    isFile.next().value ? nextFileName.next().value : ".",
  ]);

  const shifted = expansions.slice();
  const lastIndex = shifted.length - 1;
  for (let moveIndex = lastIndex; moveIndex > 0; moveIndex--) {
    const [moveFileSize, moveFileName] = shifted[moveIndex];
    if (moveFileName === ".") continue;
    for (let index = 0; index < moveIndex; index++) {
      const [spaceSize, spaceFileName] = shifted[index];
      if (spaceFileName !== ".") continue;
      if (spaceSize < moveFileSize) continue;
      shifted[index] = [moveFileSize, moveFileName];
      shifted[moveIndex] = [moveFileSize, "."];
      const sizeDifference = spaceSize - moveFileSize;
      if (sizeDifference > 0) {
        shifted.splice(index + 1, 0, [sizeDifference, "."]);
      }
      break;
    }
  }
  return shifted;
}

function* fileNameGenerator(): Generator<string> {
  let i = 0;
  while (true) {
    yield (i++).toString();
  }
}

function* fileToggle(): Generator<boolean> {
  let file = false;
  while (true) {
    file = !file;
    yield file;
  }
}

function* reverseQueueWithIndex(arr: string[]): Generator<[number, string]> {
  const indexedNumbers = Array.from(arr.entries()).reverse().filter(([, x]) =>
    x !== "."
  );
  for (const n of indexedNumbers) {
    yield n;
  }
}

if (!flags.part2) {
  const compactedData = shift(expand(data));
  const compactedValues = compactedData.slice(0, compactedData.indexOf("."));
  console.log(
    compactedValues.reduce((total, digit, i) => total + i * parseInt(digit), 0),
  );
} else {
  const compactedData = (shiftWholeFiles(data)).flatMap(([size, fileName]) =>
    new Array(size).fill(fileName)
  );
  const checksum = compactedData.reduce((total, fileName, i) => {
    if (fileName === ".") return total;
    return total + i * parseInt(fileName);
  }, 0);

  console.log(checksum);
}
