import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(username, isComputer = false) {
    this.username = username;
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
    if (isComputer) this.untriedSquares = this.shuffleUntriedSquares();
  }

  shuffleUntriedSquares() {
    let untried = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        untried.push([row, col]);
      }
    }

    for (let i = untried.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [untried[i], untried[j]] = [untried[j], untried[i]];
    }
    return untried;
  }

  attack(enemy, square) {
    if (this.isComputer) {
      return this.compAttack(enemy);
    }

    return enemy.gameboard.receiveAttack(square);
  }

  compAttack(enemy) {
    const square = this.untriedSquares.pop();
    if (square === undefined) throw new Error("No squares left");
    return enemy.gameboard.receiveAttack(square);
  }
}
