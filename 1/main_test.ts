import { assertEquals } from "jsr:@std/assert";
import { totalDistance, similarityScore } from "./main.ts";

const testInput = Deno.readTextFileSync("./test-input.txt");

Deno.test("totalDistance", function addTest() {
  assertEquals(totalDistance(testInput), 11);
});

Deno.test("similarityScore", function addTest() {
  assertEquals(similarityScore(testInput), 31);
});
