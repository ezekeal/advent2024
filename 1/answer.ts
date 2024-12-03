import { totalDistance, similarityScore } from "./main.ts";

console.log(`part1: ${totalDistance(Deno.readTextFileSync("./input.txt"))}`);

console.log(`part2: ${similarityScore(Deno.readTextFileSync("./input.txt"))}`);
