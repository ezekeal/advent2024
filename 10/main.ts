import { parseArgs } from "@std/cli/parse-args";
import { Matrix, Point } from "../utils/grid.ts";
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});

const topoMap = Matrix.fromString(Deno.readTextFileSync(dataFile)).map(Number);
let trails = topoMap.findAll((val) => val === 0).map((p) => [p]);
for (let level = 1; level < 10; level++) {
  trails = trails.map((trail) => {
    const nextPositions = trail
      .flatMap((p) => topoMap.adjacentPoints(p))
      .filter((p) => topoMap.get(p) === level);
    if (flags.part2) {
      return nextPositions;
    }
    return unique(nextPositions);
  });
}

console.log(trails.flat().length);

function unique(points: Point[]): Point[] {
  const pointString = points.map(({ row, col }) => [row, col].join(","));
  const uniquePointString = new Set(pointString);
  const uniquePoints = Array.from(uniquePointString).map((s) => {
    const [row, col] = s.split(",").map(Number);
    return { row, col };
  });
  return uniquePoints;
}