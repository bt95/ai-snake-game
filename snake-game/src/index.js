// This is the entry point of the Snake game. It initializes the game, sets up the canvas, and starts the game loop.

import Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);

  let lastTime = 0;
  const gameSpeed = 125; // Speed in milliseconds (increased by 25%)

  function gameLoop(timestamp) {
    if (timestamp - lastTime >= gameSpeed) {
      game.update();
      game.draw();
      lastTime = timestamp;
    }
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        game.setDirection(0, -1);
        break;
      case "ArrowDown":
        game.setDirection(0, 1);
        break;
      case "ArrowLeft":
        game.setDirection(-1, 0);
        break;
      case "ArrowRight":
        game.setDirection(1, 0);
        break;
    }
  });

  game.start();
  requestAnimationFrame(gameLoop);
});
