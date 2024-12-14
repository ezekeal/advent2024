import { parseArgs } from "@std/cli/parse-args";
import { Matrix } from '../utils/grid.ts';
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});
const input = Deno.readTextFileSync(dataFile);
const grid = Matrix.fromString(input);

const plantVarieties = new Set(input.replaceAll('\n', ''));
const initialValues: [string, number][] = [...plantVarieties].map(p => [p, 0]);

const perimeter: Map<string, number> = new Map(initialValues);
const area: Map<string, number> = new Map(initialValues);

grid.forEach((plant, row, col) => {
    const adjacentPoints = grid.adjacentPoints({row, col});
    area.set(plant, area.get(plant)! + 1)
    let fences = 4 - adjacentPoints.length;
    for (const adjacentPoint of adjacentPoints) {
        if (grid.get(adjacentPoint) === plant) continue;
        fences++;
    }
    perimeter.set(plant, perimeter.get(plant)! + fences);
});

const cost = [...plantVarieties].reduce((total, plant) => total + (perimeter.get(plant)! * area.get(plant)!), 0)
console.log(cost)
