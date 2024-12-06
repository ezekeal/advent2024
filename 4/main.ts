const exampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const solvePart1 = (input: string) => {
  const noChar = ".";

  const spacerLine = (length: number): string =>
    new Array(length).fill(noChar).join("");
  const reverseLine = (line: string) => line.split("").reverse().join("");
  const bothDirections = (lines: string[]) =>
    lines.concat(lines.map(reverseLine));
  const getHorizontalLines = (input: string) => input.split("\n");

  const getVerticalLines = (horizontalLines: string[]): string[] => {
    const verticalLines = horizontalLines[0]
      .split("")
      .map((_, column) =>
        horizontalLines
          .map((line) => line.charAt(column))
          .join("")
      );
    return verticalLines;
  };

  const getDiagonalRightLines = (horizontalLines: string[]): string[] => {
    const shiftedLines = horizontalLines.map((line, index, arr) => {
      const shiftedLine = spacerLine(arr.length - (index + 1)).concat(line)
        .concat(spacerLine(index));
      return shiftedLine;
    });
    const diagonalRightLines = getVerticalLines(shiftedLines);
    return diagonalRightLines;
  };

  const horizontalLines = getHorizontalLines(input);
  const verticalLines = getVerticalLines(horizontalLines);
  const diagonalRightLines = getDiagonalRightLines(horizontalLines);
  const diagonalLeftLines = getDiagonalRightLines(
    horizontalLines.map((line) => line.split("").reverse().join("")),
  );

  const allLines = [
    horizontalLines,
    verticalLines,
    diagonalRightLines,
    diagonalLeftLines,
  ].flatMap(bothDirections);

  const xmasRegex = /XMAS/g;
  console.log(
    allLines.reduce(
      (total, line) => total + line.matchAll(xmasRegex).toArray().length,
      0,
    ),
  );
};

const solvePart2 = (input: string) => {
  const getCharGrid = (input: string) =>
    input.split("\n").map((line) => line.split(""));
  function validateXmas(x: number, y: number, charGrid: string[][]): boolean {
    if (x === 0 || y === 0 || x === charGrid[0].length - 1 || y === charGrid.length - 1) return false;

    const center = charGrid[y][x];
    if (center !== "A") return false;

    const cornerCoordinates = [[x + 1, y + 1], [x - 1, y - 1], [x - 1, y + 1], [
      x + 1,
      y - 1,
    ]];

    const corners = cornerCoordinates.map(([cx, cy]) => charGrid[cy][cx]);
    if (corners[0] == corners[1] || corners[2] == corners[3]) return false;

    const charCount = new Map([["S", 0], ["M", 0]]);
    for (const char of corners) {
      if (!charCount.has(char)) return false;
      charCount.set(char, charCount.get(char)! + 1);
    }

    return charCount.get("M") === 2 && charCount.get("S") === 2;
  }

  const charGrid = getCharGrid(input)
  let xmasCount = 0;
  for(const [y, row] of charGrid.entries()) {
    for(const [x, _char] of row.entries()) {
      if(validateXmas(x, y, charGrid)) {
        xmasCount++
      }
    }
  }
  return xmasCount;
};

console.log(solvePart2(Deno.readTextFileSync('./data.txt')));
