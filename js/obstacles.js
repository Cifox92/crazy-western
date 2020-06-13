class Obstacle {
    constructor(ctx, w, horsePosY0, horseHeight) {
        this.ctx = ctx
        this.obstacleWidth = 100 + Math.random() * 100
        this.obstacleHeight = this.obstacleWidth
        this.posX = w
        this.posY = horsePosY0 + horseHeight -this.obstacleHeight
        this.velX = 3

        this.image = new Image()
        this.image.src = "img/meteor.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.obstacleWidth, this.obstacleHeight)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}