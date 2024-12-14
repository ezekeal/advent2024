import { parseArgs } from "@std/cli/parse-args";
import { addToFrequency } from "../utils/frequency.ts";
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});
let frequencies: Map<number, number> = new Map();
const input = Deno.readTextFileSync(dataFile);
input.split(" ").map(Number).forEach((n) => addToFrequency(n, 1, frequencies));

let blinks = 25;
if (flags.part2) {
  blinks = 75;
}

for (let i = 0; i < blinks; i++) {
  frequencies = blinkV2(frequencies);
}

console.log(Array.from(frequencies.values()).reduce((total, count) => total + count, 0));

function blinkV2(input: Map<number, number>): Map<number,number> {
  const out: Map<number, number> = new Map()
  for (const [number, count] of input) {
    if (number === 0) {
      addToFrequency(1, count, out);
      continue;
    }
    const nStr = number.toString();
    const digits = nStr.length;
    if (digits % 2 === 0) {
      [nStr.slice(0, digits / 2), nStr.slice(digits / 2)].map(Number).forEach(
        (n) => addToFrequency(n, count, out),
      );
      continue;
    }
    addToFrequency(number * 2024, count, out);
  }
  return out;
}
