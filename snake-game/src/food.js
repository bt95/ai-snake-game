class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    spawn(canvasWidth, canvasHeight, gridSize) {
        this.position.x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
        this.position.y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
    }
}

export default Food;