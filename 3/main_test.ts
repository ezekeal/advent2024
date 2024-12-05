import { assertEquals } from "@std/assert";
import { memoryScan, memoryScanWithToggles, runMul } from "./main.ts";

Deno.test("runMul", function () {
  assertEquals(runMul("mul(4,2)"), 8);
});

Deno.test("memoryScan", function () {
  const exampleData =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  assertEquals(memoryScan(exampleData), 161);
});

Deno.test("memoryScan", function () {
  const exampleData =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  assertEquals(memoryScanWithToggles(exampleData), 48);
});
