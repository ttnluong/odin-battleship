import { describe, expect, test, beforeEach } from "@jest/globals";
import { Game, Gameboard } from "./game.js";

let game;

beforeEach(() => {
  game = new Game();
});

function getSquaresInState(gameboard, state) {
  let squares = [];
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (gameboard.getSquareState([row, col]) === state)
        squares.push([row, col]);
    }
  }
  return squares;
}

test("new game has both players and 17 ship squares", () => {
  const shipsPlayer = getSquaresInState(game.player.gameboard, "ship");
  const shipsComputer = getSquaresInState(game.computer.gameboard, "ship");
  expect(game.player.username).toBe("Player");
  expect(game.computer.username).toBe("Computer");
  expect(shipsPlayer.length).toBe(17);
  expect(shipsComputer.length).toBe(17);
});

test("after a player attack, computer replies", () => {
  const emptySquaresComputer = getSquaresInState(
    game.computer.gameboard,
    "empty",
  );
  game.playTurn(emptySquaresComputer[1]);
  expect(game.computer.gameboard.getSquareState(emptySquaresComputer[1])).toBe(
    "miss",
  );

  const hitsSquaresPlayer = getSquaresInState(game.player.gameboard, "hit");
  const missesSquaresPlayer = getSquaresInState(game.player.gameboard, "miss");
  expect(hitsSquaresPlayer.length + missesSquaresPlayer.length).toBe(1);
  expect(game.winner).toBeNull();
});

test("attacking the same square twice throws", () => {
  game.playTurn([2, 2]);
  expect(() => game.playTurn([2, 2])).toThrow("Square already attacked");

  const hitsSquaresPlayer = getSquaresInState(game.player.gameboard, "hit");
  const missesSquaresPlayer = getSquaresInState(game.player.gameboard, "miss");
  expect(hitsSquaresPlayer.length + missesSquaresPlayer.length).toBe(1);
});

test("player wins after hitting all computer ship squares", () => {
  const shipsSquaresComputer = getSquaresInState(
    game.computer.gameboard,
    "ship",
  );
  for (const shipsSquare of shipsSquaresComputer) {
    game.playTurn(shipsSquare);
  }
  expect(game.winner).toBe(game.player);
});

test("computer wins after hitting all player ship squares", () => {
  const shipsSquaresPlayer = getSquaresInState(game.player.gameboard, "ship");
  for (const shipsSquare of shipsSquaresPlayer) {
    game.player.gameboard.receiveAttack(shipsSquare);
  }
  const result = game.playTurn([0, 0]);
  expect(result).toBe(game.computer);
  expect(game.winner).toBe(game.computer);
});

test("playing after game is over throws", () => {
  const shipsSquaresComputer = getSquaresInState(
    game.computer.gameboard,
    "ship",
  );
  for (const shipsSquare of shipsSquaresComputer) {
    game.playTurn(shipsSquare);
  }
  expect(() => game.playTurn([0, 0])).toThrow("Game over");
});
