import { Player } from "../gamestate/player.js";

export class Game {
    constructor() {
        this.player = new Player("Player");
        this.computer = new Player("Computer", true);
        this.player.gameboard = placeShipsRandom(this.player);
        this.computer.gameboard = placeShipsRandom(this.computer);
    }
    
    placeShipsRandom(gameboard) {
        const lengths = [5, 4, 3, 3, 2];
        for (const length of lengths) {
            let placed = false;
            while(!placed) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

                try {
                    gameboard.placeShip([row, col], length, direction);
                    placed = true;
                } catch (error) {
                    if (error.message !== "Invalid placement") throw error;
                }
            }
        }
    }

    playTurn(square) {
        this.player.attack(this.computer, square);
        if (this.computer.gameboard.gameOver()) return { winner: this.player };
        
        this.computer.attack(this.player);
        if (this.player.gameboard.gameOver()) return { winner: this.computer };

        return { winner: null };
    }

}


