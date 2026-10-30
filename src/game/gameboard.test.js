import { describe, expect, test, beforeEach } from "@jest/globals";
import { Gameboard } from "./gameboard.js";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe("grid", () => {
  test("check square in grid with coordinates", () => {
    expect(gameboard.getSquare([0, 9])).toEqual(null);
  });

  test("check square outside of grid", () => {
    expect(gameboard.getSquare([10, 0])).toEqual(undefined);
  });
});

describe("place ship", () => {
  test("place a ship horizontally", () => {
    const horShip = gameboard.placeShip([1, 1], 2, "horizontal");
    expect(gameboard.getSquare([1, 1])).toBe(horShip);
    expect(gameboard.getSquare([1, 2])).toBe(horShip);
    expect(gameboard.getSquare([0, 1])).toBe(null);
    expect(gameboard.getSquare([1, 3])).toBe(null);
    expect(gameboard.getSquare([2, 1])).toBe(null);
    expect(gameboard.getSquare([1, 0])).toBe(null);
  });

  test("place a ship vertically", () => {
    const verShip = gameboard.placeShip([3, 3], 2, "vertical");
    expect(gameboard.getSquare([3, 3])).toBe(verShip);
    expect(gameboard.getSquare([4, 3])).toBe(verShip);
    expect(gameboard.getSquare([2, 3])).toBe(null);
    expect(gameboard.getSquare([5, 3])).toBe(null);
    expect(gameboard.getSquare([3, 2])).toBe(null);
    expect(gameboard.getSquare([3, 4])).toBe(null);
  });

  test("rejects placing a ship off-board, throws error", () => {
    expect(() => gameboard.placeShip([9, 9], 2, "horizontal")).toThrow(
      "Invalid placement",
    );
    expect(gameboard.getSquare([9, 9])).toBe(null);
  });

  test("rejects an overlapping ship, throws error", () => {
    const horShip = gameboard.placeShip([1, 1], 2, "horizontal");
    expect(() => gameboard.placeShip([0, 2], 2, "vertical")).toThrow(
      "Invalid placement",
    );
    expect(gameboard.getSquare([0, 2])).toBe(null);
    expect(gameboard.getSquare([1, 1])).toBe(horShip);
  });
});

describe("receive attack", () => {
  test("a hit damages the ship", () => {
    const horShip = gameboard.placeShip([1, 1], 2, "horizontal");
    gameboard.receiveAttack([1, 1]);
    expect(horShip.hitcount).toBe(1);
  });

  test("a miss does not damage the ship", () => {
    const horShip = gameboard.placeShip([1, 1], 2, "horizontal");
    gameboard.receiveAttack([2, 1]);
    expect(horShip.hitcount).toBe(0);
    expect(gameboard.getMisses()).toContainEqual([2, 1]);
  });
});

describe("game over?", () => {
  test("empty board is not game over", () => {
    expect(gameboard.gameOver()).toBe(false);
  });

  test("board with one ship, damaged but not sunk, is not game over", () => {
    gameboard.placeShip([1, 1], 2, "horizontal");
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.gameOver()).toBe(false);
  });

  test("board with two ships, one not sunk, is not game over", () => {
    gameboard.placeShip([3, 3], 3, "vertical");
    gameboard.placeShip([1, 1], 2, "horizontal");
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);
    expect(gameboard.gameOver()).toBe(false);
  });

  test("board with two ships, both sunk, is game over", () => {
    gameboard.placeShip([3, 3], 2, "vertical");
    gameboard.placeShip([1, 1], 2, "horizontal");
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([3, 3]);
    gameboard.receiveAttack([4, 3]);
    expect(gameboard.gameOver()).toBe(true);
  });
});
