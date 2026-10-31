import { describe, expect, test, beforeEach } from "@jest/globals";
import { Game } from "./game.js";

let game;

beforeEach(() => {
  game = new Game();
});

function shipSquares() {}

test("setup", () => {
  expect(game.player.username).toBe("Player");
  expect(game.computer.username).toBe("Computer");
});
