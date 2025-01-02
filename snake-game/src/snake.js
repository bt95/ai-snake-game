class Snake {
    constructor() {
        this.body = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.growAmount = 0;
    }

    move() {
        const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
        this.body.unshift(head);
        if (this.growAmount > 0) {
            this.growAmount--;
        } else {
            this.body.pop();
        }
    }

    grow() {
        this.growAmount++;
    }

    changeDirection(newDirection) {
        if (newDirection.x !== -this.direction.x || newDirection.y !== -this.direction.y) {
            this.direction = newDirection;
        }
    }
}

export default Snake;