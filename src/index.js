import "./styles.css";
import { Game } from "./controller/game.js";
import { displayBoard } from "./ui/dom.js";

const game = new Game();

displayBoard(game.player.gameboard, "playerboard");
displayBoard(game.computer.gameboard, "computerboard", true);
