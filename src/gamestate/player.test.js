import { describe, expect, test, beforeEach } from "@jest/globals";
import { Player } from "./player.js";

let player;
let computer;

beforeEach(() => {
  player = new Player("Player");
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
  expect(player.untriedSquares).toBeUndefined();
});

test("after a hit, the computer queues the neighbors", () => {
  player.gameboard.placeShip([4, 3], 2, "vertical");
  computer.untriedSquares.push([4, 3]);

  const hit = computer.attack(player);

  expect(hit).toBe(true);
  expect(computer.targetQueue).toContainEqual([3, 3]);
  expect(computer.targetQueue).toContainEqual([5, 3]);
  expect(computer.targetQueue).toContainEqual([4, 2]);
  expect(computer.targetQueue).toContainEqual([4, 4]);
});
