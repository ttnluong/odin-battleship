import { Ship } from "./ship.js"

export class Gameboard {
    constructor() {
        this.board = this.createBoard(10, 10);
    }

    createBoard(rows, columns) {
        let grid = [];
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= columns; j++) {
                let coordinate = {row:i, col:j};
                grid.push(coordinate);
            }
        }
        return grid;
    }

    placeShip() {

    }
}