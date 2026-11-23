import { Gameboard } from "../gamestate/gameboard.js";
import { Player } from "../gamestate/player.js";

export class Game {
  constructor() {
    this.player = new Player("Player");
    this.computer = new Player("Computer", true);
    this.player.gameboard.placeShipsRandom();
    this.computer.gameboard.placeShipsRandom();
    this.winner = null;
    this.started = false;
  }

  playTurn(square) {
    if (this.winner) throw new Error("Game over");

    this.player.attack(this.computer, square);
    this.started = true;
    if (this.computer.gameboard.gameOver()) return (this.winner = this.player);

    this.computer.attack(this.player);
    if (this.player.gameboard.gameOver()) return (this.winner = this.computer);

    return null;
  }

  randomisePlayerFleet() {
    if (this.started) throw new Error("Game has begun");
    this.player.gameboard = new Gameboard();
    this.player.gameboard.placeShipsRandom();
  }

  newGame() {
    this.started = false;
    this.computer.gameboard = new Gameboard();
    this.player.gameboard = new Gameboard();
    this.player.gameboard.placeShipsRandom();
  }
}
