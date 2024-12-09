import { example, full } from "./data.ts";
import { Dataset, Direction, Position, State } from "./types.ts";

// Constants
const OBSTACLE = "#";
const MARKED_OBSTACLE = "!";
const moveMap: Map<Direction, (p: Position) => Position> = new Map([
  ["^", ([x, y]) => [x, y - 1]],
  ["V", ([x, y]) => [x, y + 1]],
  ["<", ([x, y]) => [x - 1, y]],
  [">", ([x, y]) => [x + 1, y]],
]);
const turnMap: Map<Direction, Direction> = new Map([
  ["^", ">"],
  [">", "V"],
  ["V", "<"],
  ["<", "^"],
]);

function runPlan(input: Dataset) {
  // Starting State
  const [guardState, map] = input;

  // Derived Values
  const rows = map.split("\n");
  const grid = rows.map((row) => row.split(""));
  const width = rows[0].length;
  const height = rows.length;

  // Functions
  const isOutOfBounds = ([x, y]: Position): boolean =>
    x < 0 || x >= width || y < 0 || y >= height;
  const applyStep = (state: State, step: (s: State) => State): State =>
    step(state);
  const getNextPosition = (
    { guardState: { position, direction } }: State,
  ): Position => moveMap.get(direction)!(position);
  const getNextChar = ({ nextPosition: [x, y], grid }: State) => grid[y][x];
  const mark = (state: State): State => {
    const {
      grid,
      guardState: { position: [x, y] },
      totalPositions,
      nextPosition,
    } = state;
    const outOfBounds = isOutOfBounds(nextPosition);
    if (grid[y][x] !== ".") return { ...state, outOfBounds };
    grid[y][x] = "X";
    return { ...state, totalPositions: totalPositions + 1, outOfBounds };
  };
  const turn = (state: State): State => {
    const {
      guardState,
      grid,
      nextChar,
      nextPosition,
      outOfBounds,
      visitedObstacles,
    } = state;
    if (outOfBounds || nextChar !== OBSTACLE) return state;
    const looping = visitedObstacles.has(
      nextPosition.join() + guardState.direction,
    );
    visitedObstacles.add(nextPosition.join() + guardState.direction);
    let newState = {
      ...state,
      guardState: {
        ...guardState,
        direction: turnMap.get(guardState.direction)!,
      },
      visitedObstacles,
      looping,
    };
    newState = { ...newState, nextPosition: getNextPosition(newState) };
    if (isOutOfBounds(newState.nextPosition)) {
      return { ...newState, outOfBounds: true };
    }

    const [x, y] = newState.nextPosition;
    newState = { ...newState, nextChar: grid[y][x] };
    if (newState.nextChar === OBSTACLE) return turn(newState);
    return newState;
  };
  const move = (state: State): State => {
    const { guardState, nextPosition, grid, outOfBounds } = state;
    if (outOfBounds) return state;
    if (isOutOfBounds(nextPosition)) return { ...state, outOfBounds: true };

    const newState = {
      ...state,
      guardState: { ...guardState, position: nextPosition },
      nextPosition: moveMap.get(guardState.direction)!(nextPosition),
    };
    if (isOutOfBounds(newState.nextPosition)) {
      return { ...newState, outOfBounds: true };
    }

    const [x, y] = newState.nextPosition;
    return {
      ...newState,
      nextChar: grid[y][x],
    };
  };

  let state: State = {
    guardState,
    totalPositions: 0,
    grid,
    nextPosition: [0, 0],
    nextChar: "",
    outOfBounds: false,
    visitedObstacles: new Set(),
    looping: false,
  };
  state = { ...state, nextPosition: getNextPosition(state) };
  state = { ...state, nextChar: getNextChar(state) };

  while (!state.outOfBounds) {
    state = [mark, turn, move].reduce(applyStep, state);
    if (state.looping) break;
  }

  return state;
}

if (import.meta.main) {
  let totalPositions = 0;
  const [guardState, map] = full;
  const obstacleMap = runPlan([guardState, map]).grid.map((rows) =>
    rows.join("")
  ).join("\n");
  for (let i = 0; i < map.length; i++) {
    if (obstacleMap[i] !== "X") continue;
    const mapWithNewObstacle = map.slice(0, i) + "#" + map.slice(i + 1);
    const endState = runPlan([guardState, mapWithNewObstacle]);
    if (endState.looping) {
      totalPositions++;
    }
  }
  console.log(totalPositions);
}
