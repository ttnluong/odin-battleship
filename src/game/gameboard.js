import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = this.createBoard(10, 10);
    this.ships = [];
    this.misses = [];
  }

  createBoard(rows, columns) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => null),
    );
  }

  getSquare([row, col]) {
    if (row < 0 || row > 9 || col < 0 || col > 9) return undefined;
    return this.board[row][col];
  }

  placeShip([row, col], length, direction) {
    const placement = [];
    for (let i = 0; i < length; i++) {
      const coords =
        direction === "horizontal" ? [row, col + i] : [row + i, col];
      placement.push(coords);
    }

    for (const place of placement) {
      if (this.getSquare(place) !== null) throw new Error("Invalid placement");
    }

    const ship = new Ship(length);
    for (const [r, c] of placement) {
      this.board[r][c] = ship;
    }

    this.ships.push(ship);
    return ship;
  }

  receiveAttack([row, col]) {
    if (this.getSquare([row, col]) === undefined)
      throw new Error("Invalid attack");
    if (this.getSquare([row, col]) === null) this.misses.push([row, col]);
    else this.board[row][col].hit();
  }

  getMisses() {
    return [...this.misses];
  }

  gameOver() {
    const ships = this.ships;
    if (ships.length === 0) return false;
    for (const ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}
