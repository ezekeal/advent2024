import { parseArgs } from "@std/cli/parse-args";
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});

type Tile = { height: number; trails: number; nextPositions: Position[] };
type Position = { x: number; y: number };
type Grid = Tile[][];

const data = Deno.readTextFileSync(dataFile);
const rows = data.split("\n");
const trailHeads = [];
const grid: Grid = rows
  .map((row, y) =>
    row.split("")
      .map((n, x) => {
        const height = parseInt(n);
        const segment = {
          height,
          trails: n === "0" ? 1 : 0,
          nextPositions: [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
          ].filter(({ x, y }) =>
            x >= 0 && y >= 0 && grid.at(y)?.at(x)?.height === height + 1
          ),
        };
        if (height === 0) {
          return segment;
        }
      })
  );

for (const [y, row] of grid.entries()) {
  for (const [x, { height, trails }] of row.entries()) {
    const nextPositions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(({ x, y }) =>
      x >= 0 && y >= 0 && grid.at(y)?.at(x)?.height === height + 1
    );
    grid[y][x].nextPositions = nextPositions;
  }
}

for (const level of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
}

if (!flags.part2) {
  console.log(grid);
} else {
  // TODO part2
}

function getTrailheadPositions(grid: Grid): Position[] {
  const trailheads = [];
  for (const [y, row] of grid.entries()) {
    for (const [x, value] of row.entries()) {
      if (value === 0) trailheads.push({ x, y });
    }
  }
  return trailheads;
}

function checkPath(position: Position, grid: Grid, prevValue: number): number {
  const { x, y } = position;
  if (x < 0 || y < 0) return 0;
  const value = grid.at(y)?.at(x);
  if (value == null) return 0;
  if (value !== prevValue + 1 && value !== 0) return 0;
  if (value === 9) return 1;
  const nextPositions = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];
  return nextPositions.reduce(
    (total, p) => total + checkPath(p, grid, value),
    0,
  );
}
