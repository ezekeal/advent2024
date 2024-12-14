import { parseArgs } from "@std/cli/parse-args";
import { Frequencies }  from '../utils/frequency.ts'
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});
const input = Deno.readTextFileSync(dataFile)
let stones = input.split(' ').map(Number)
const frequencies: Frequencies<number>(stones)

let blinks = 25;
if(flags.part2) {
  blinks = 75
}

for(let i = 0; i < blinks; i++) {
  stones = stones.flatMap(blink);
  console.log(i, stones.length)
}

console.log(stones.length)


function blink(n: number): number[] {
  if(n === 0)  {
    return [1]
  }
  const nStr = n.toString()
  const digits = nStr.length
  if(digits % 2 === 0) {
    return [nStr.slice(0, digits/2), nStr.slice(digits / 2)].map(Number)
  }

  return [n * 2024]
}

function blinkV2(frequencies: Frequencies) {
  for (const n of frequencies) {
    
  }
}
