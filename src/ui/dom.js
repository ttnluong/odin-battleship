export function displayBoard(gameboard, container, isComputer = false) {
  const containerBoard = document.getElementById(container);
  containerBoard.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const square = document.createElement(isComputer ? "button" : "div"); // buttons for computer board
      let state = gameboard.getSquareState([row, col]);
      if (isComputer && state === "ship") state = "empty"; // hide ships

      square.classList.add("square", state);
      square.dataset.row = row;
      square.dataset.col = col;

      if (isComputer) {
        square.type = "button";
        if (state === "hit" || state === "miss") square.disabled = true;
      }

      containerBoard.appendChild(square);
    }
  }
}
