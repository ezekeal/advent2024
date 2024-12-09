import { parseArgs } from "@std/cli/parse-args";
type Position = { x: number; y: number };
const [dataFile] = Deno.args;
const flags = parseArgs(Deno.args, {
  boolean: ["part2"],
});
const data = Deno.readTextFileSync(dataFile);
const rows = data.split("\n").map((r) => r.split(""));
const height = rows.length;
const width = rows[0].length;

const antennaLocations = new Map<string, Position[]>();
const isInBounds = ({ x, y }: Position) =>
  !(x < 0 || x > (width - 1) || y < 0 || y > (height - 1));

let antiNodes: Set<Position> = new Set();
for (const [y, row] of rows.entries()) {
  for (const [x, s] of row.entries()) {
    if (s === ".") continue;
    const locations = antennaLocations.get(s) || [];
    if (locations.length) {
      antiNodes = antiNodes.union(
        new Set(locations.flatMap(getAntiNodes({ x, y }))),
      );
    }
    antennaLocations.set(s, locations.concat({ x, y }));
  }
}

let totaLocations = new Set(Array.from(antiNodes).map((a) => JSON.stringify(a)))
  .difference(
    new Set(antennaLocations.values().map((v) => JSON.stringify(v))),
  );
//test
totaLocations.forEach((l) => {
  const { x, y } = JSON.parse(l);
  if (rows[y][x] === ".") rows[y][x] = "#";
});

if (flags.part2) {
  totaLocations = new Set(Array.from(antiNodes).map((a) => JSON.stringify(a)));
}
console.log(totaLocations.size);

function getAntiNodes(p1: Position): (p2: Position) => Position[] {
  return function (p2: Position) {
    const distance = { x: p2.x - p1.x, y: p2.y - p1.y };
    if (!flags.part2) {
      const filteredNodes = [{ x: p1.x - distance.x, y: p1.y - distance.y }, {
        x: p1.x + 2 * distance.x,
        y: p1.y + 2 * distance.y,
      }].filter(isInBounds);
      console.log(filteredNodes);
      return filteredNodes;
    }

    const antiNodes = [];
    for (let i = 1; true; i++) {
      const nextNode = { x: p1.x - i * distance.x, y: p1.y - i * distance.y };
      if (!isInBounds(nextNode)) break;
      antiNodes.push(nextNode);
    }
    for (let i = 0; true; i++) {
      const nextNode = { x: p1.x + i * distance.x, y: p1.y + i * distance.y };
      if (!isInBounds(nextNode)) break;
      antiNodes.push(nextNode);
    }
    return antiNodes;
  };
}
