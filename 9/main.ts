const [dataFile] = Deno.args;

const data = Deno.readTextFileSync(dataFile);

function expand(input: string): [string, number] {
  const nextFileName = fileNameGenerator();
  const isFile = fileToggle();
  let expanded = "";
  let digits = 0;
  for (const c of input) {
    const digit = parseInt(c);
    const nextChar = isFile.next().value ? nextFileName.next().value : ".";
    digits += nextChar !== "." ? digit : 0;
    expanded = expanded.concat(nextChar.repeat(digit));
  }
  console.log(expanded.length)
  return [expanded, digits];
}

function shift([input, digits]: [string, number]): string {
  let shifted = input.slice().split("");
  let lastIndex = shifted.length - 1;
  for (const [i, c] of shifted.entries()) {
    if (digits-- <= 0) break;
    if (c !== ".") continue;
    while (shifted[lastIndex] === ".") lastIndex--;
    shifted = shifted.with(i, shifted[lastIndex]).with(lastIndex, ".");
  }
  console.log('shifted')
  return shifted.join("");
}

function* fileNameGenerator(): Generator<string> {
  let i = 0;
  while (true) {
    yield (i++).toString();
  }
}

function* fileToggle(): Generator<boolean> {
  let file = false;
  while (true) {
    file = !file;
    yield file;
  }
}

console.log(
  shift(expand(data)).split(".")[0].split("").reduce((total, digit, i) =>
    total + i * parseInt(digit)
  , 0),
);
