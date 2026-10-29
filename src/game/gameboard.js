import { Ship } from "./ship.js"

export class Gameboard {
    constructor() {
        this.board = this.createBoard(9, 9);
    }

    createBoard(rows, columns) {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(null);
            }
            grid.push(row);
        }
        return grid;
    }

    placeShip() {

    }
}