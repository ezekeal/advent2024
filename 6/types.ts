export type Position = [x: number, y: number];
export type Direction = "^" | "V" | "<" | ">";
export type GaurdState = { position: Position; direction: Direction };
export type Dataset = [GaurdState, string];
export type State = {
  guardState: GaurdState;
  totalPositions: number;
  grid: string[][];
  nextPosition: Position;
  nextChar: string;
  visitedObstacles: Set<string>;
  looping: boolean;
  outOfBounds: boolean;
};
