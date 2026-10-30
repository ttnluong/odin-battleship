import { describe, expect, test, beforeEach } from "@jest/globals";
import { Ship } from "./ship.js";

let ship;

beforeEach(() => {
  ship = new Ship(2);
});

test("a new ship is not sunk", () => {
  expect(ship.isSunk()).toBe(false);
});

test("a ship of length 2 is not sunk after one hit", () => {
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("a ship of length 2 is sunk after two hits", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("an extra hit on a sunk ship leaves hitcount the same", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hitcount).toBe(2);
});

test("a ship of length 1 is sunk after one hit", () => {
  const smallShip = new Ship(1);
  smallShip.hit();
  expect(smallShip.isSunk()).toBe(true);
});
