export type Point = { row: number; col: number };

export class Matrix<T> {
  private readonly data: T[][];

  constructor(data: T[][]) {
    this.data = data;
  }

  get rows(): number {
    return this.data.length;
  }

  get cols(): number {
    return this.rows > 0 ? this.data[0].length : 0;
  }

  get({ row, col }: Point): T {
    return this.data[row][col];
  }

  set({ row, col }: Point, value: T): void {
    this.data[row][col] = value;
  }

  inBounds({ row, col }: Point): boolean {
    return row >= 0 && col >= 0 && row < this.rows && col < this.cols
  }

  static fromString(input: string): Matrix<string> {
    const data = input
      .trim()
      .split("\n")
      .map((row) => row.split(""));

    return new Matrix(data);
  }

  forEach<U>(fn: (val: T, r: number, c: number) => U) {
    for (const [r, row] of this.data.entries()) {
      for (const [c, val] of row.entries()) {
        fn(val, r, c);
      }
    }
  }

  map<U>(fn: (val: T, r: number, c: number) => U): Matrix<U> {
    const mapped = this.data.map((row, r) =>
      row.map((val, c) => fn(val, r, c))
    );
    return new Matrix(mapped);
  }

  findAll(predicate: (val: T, r: number, c: number) => boolean): Point[] {
    const results = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (predicate(this.data[r][c], r, c)) {
          results.push({ row: r, col: c });
        }
      }
    }
    return results;
  }

  adjacentPoints({ row, col }: Point): Point[] {
    return [
        { row: row + 1, col },
        { row: row - 1, col },
        { col: col + 1, row },
        { col: col - 1, row },
      ].filter(p => this.inBounds(p));
  }
}
