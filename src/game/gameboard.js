import { Ship } from "./ship.js"

export class Gameboard {
    constructor() {
        this.board = this.createBoard(10, 10);
    }

    createBoard(rows, columns) {
        return Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => null)
        );
    }

    getSquare([row, col]) {
        if (row < 0 || row > 9 || col < 0 || col > 9) return undefined;
        return this.board[row][col];
    }

    placeShip() {

    }
}