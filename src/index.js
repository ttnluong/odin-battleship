import "./styles.css";
import { displayBoard } from "./ui/dom.js";

displayBoard(game.player.gameboard, "playerboard");
displayBoard(game.computer.gameboard, "computerboard", true);
