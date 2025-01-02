export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.cellSize = 10; // Reduce cell size for smoother movement
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
  }

  start() {
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
  }

  update() {
    if (this.gameOver) return;

    // Update snake position
    let head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y,
    };

    // Wrap around the canvas
    if (head.x < 0) head.x = this.ctx.canvas.width / this.cellSize - 1;
    if (head.x >= this.ctx.canvas.width / this.cellSize) head.x = 0;
    if (head.y < 0) head.y = this.ctx.canvas.height / this.cellSize - 1;
    if (head.y >= this.ctx.canvas.height / this.cellSize) head.y = 0;

    // Check for collisions with the snake's body
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.endGame();
        return;
      }
    }

    this.snake.unshift(head);
    this.snake.pop();

    // Check for collisions with food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.snake.push({}); // Grow snake
      this.food = this.generateFood(); // Generate new food
      this.score += 10; // Increase score
    }
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Draw snake
    this.ctx.fillStyle = "green";
    this.ctx.strokeStyle = "darkgreen";
    for (const segment of this.snake) {
      this.ctx.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      this.ctx.strokeRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    }

    // Draw food
    this.ctx.fillStyle = "red";
    this.ctx.strokeStyle = "darkred";
    this.ctx.fillRect(
      this.food.x * this.cellSize,
      this.food.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
    this.ctx.strokeRect(
      this.food.x * this.cellSize,
      this.food.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );

    // Draw score
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Verdana";
    this.ctx.fillText("Score: " + this.score, 10, 20);
  }

  generateFood() {
    const x = Math.floor(
      (Math.random() * this.ctx.canvas.width) / this.cellSize
    );
    const y = Math.floor(
      (Math.random() * this.ctx.canvas.height) / this.cellSize
    );
    return { x, y };
  }

  setDirection(x, y) {
    // Prevent the snake from reversing
    if (this.direction.x !== -x && this.direction.y !== -y) {
      this.direction = { x, y };
    }
  }

  endGame() {
    this.gameOver = true;
    setTimeout(() => {
      alert(`Game Over! Your score is ${this.score}`);
      this.start();
    }, 100);
  }
}
