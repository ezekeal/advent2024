import { assertEquals } from "@std/assert";
import { countSafeReports } from "./main.ts";

Deno.test('countSafeReports', function () {
  const data = Deno.readTextFileSync('data.example.txt');
  assertEquals(countSafeReports(data), 2);
});

Deno.test('countSafeReports (dampened)', function () {
  const data = Deno.readTextFileSync('data.example.txt');
  const dampen = true;
  assertEquals(countSafeReports(data, dampen), 4);
});

Deno.test('countSafeReports (dampened)', function () {
  const data = Deno.readTextFileSync('data.txt');
  const dampen = true;
  assertEquals(countSafeReports(data, dampen), 4);
});
