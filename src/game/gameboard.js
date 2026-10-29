import { Ship } from "./ship.js"

export class Gameboard {
    constructor() {
        this.board = this.createBoard(9, 9);
    }

    createBoard(rows, columns) {
        return Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => null)
        );
    }

    placeShip() {

    }
}