import { parseArgs } from "@std/cli/parse-args";
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});

const grid = Deno.readTextFileSync(dataFile).split('\n').map(row => row.split(''))


if(!flags.part2) {
  printGrid(grid)
}

function printGrid(grid: string[][]) {
  console.log(grid.map(row => row.join('')).join('\n'));
}