import "./styles.css";
import { Game } from "./controller/game.js";
import { displayBoard, onSquareClick, showMessage } from "./ui/dom.js";

const game = new Game();

function render() {
  displayBoard(game.player.gameboard, "playerboard");
  displayBoard(game.computer.gameboard, "computerboard", true);
}

function showWinner() {
  showMessage(game.winner === game.player ? "You win!" : "Computer wins!");
}

function handleAttack(square) {
  if (game.winner) return;

  try {
    game.playTurn(square);
  } catch (error) {
    showMessage(error.message);
    return;
  }

  render();
  showMessage("");

  if (game.winner) showWinner();
}

onSquareClick("computerboard", handleAttack);

render();
