import { describe, expect, test, beforeEach } from "@jest/globals";
import { Player } from "./player.js";

let human;
let computer;

beforeEach(() => {
  human = new Player("Human");
  computer = new Player("Computer", true);
});

test("untriedSquares has 100 entries", () => {
  expect(computer.untriedSquares.length).toBe(100);
});

test("untriedSquares has all squares present", () => {
  expect(computer.untriedSquares).toContainEqual([0, 0]);
  expect(computer.untriedSquares).toContainEqual([4, 6]);
  expect(computer.untriedSquares).toContainEqual([9, 9]);
});

test("untriedSquares has no duplicates", () => {
  const squares = new Set(
    computer.untriedSquares.map(([row, col]) => `${row},${col}`),
  );
  expect(squares.size).toBe(100);
});

test("a human player has no untriedSquares", () => {
  expect(human.untriedSquares).toBeUndefined();
});
