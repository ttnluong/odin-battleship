import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = this.createBoard(10, 10);
    this.ships = [];
    this.misses = [];
    this.attacked = new Set();
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

  placeShipsRandom(gameboard) {
    const lengths = [5, 4, 3, 3, 2];
    for (const length of lengths) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        try {
          this.placeShip([row, col], length, direction);
          placed = true;
        } catch (error) {
          if (error.message !== "Invalid placement") throw error;
        }
      }
    }
  }

  receiveAttack([row, col]) {
    if (this.getSquare([row, col]) === undefined)
      throw new Error("Invalid attack");

    const attack = `${row}, ${col}`;
    if (this.attacked.has(attack)) throw new Error("Square already attacked");
    this.attacked.add(attack);

    if (this.getSquare([row, col]) === null) {
      this.misses.push([row, col]);
      return false;
    } else this.board[row][col].hit();
    return true;
  }

  getMisses() {
    return [...this.misses];
  }

  getSquareState([row, col]) {
    const attacked = this.attacked.has(`${row}, ${col}`);
    const hasShip = this.getSquare([row, col]) !== null;
    if (attacked) return hasShip ? "hit" : "miss";
    return hasShip ? "ship" : "empty";
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
