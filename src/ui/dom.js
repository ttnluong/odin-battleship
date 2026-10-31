import { Gameboard } from "../gamestate/gameboard.js";

export function displayBoard(gameboard, container, showShips) {
  const containerBoard = document.querySelector(container);
  containerBoard.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const square = document.createElement("div");
      let state = gameboard.getSquareState([row, col]);
      if (!showShips && state === "ship") state = "empty";

      square.classList.add("square", state);
      square.dataset.row = row;
      square.dataset.col = col;

      containerBoard.appendChild(square);
    }
  }
}
