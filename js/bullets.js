class Bullets {
    constructor(ctx, playerPositionX, playerPositionY, playerWidth, playerHeight) {
        this.ctx = ctx
        this.posX = playerPositionX + playerWidth
        this.posY = playerPositionY + playerHeight / 1.75
        this.playerHeight = playerHeight

        this.bulletWidth = 15
        this.bulletHeight = 13

        this.image = new Image()
        this.image.src = "img/bullet.png"

        this.velX = 12  
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.bulletWidth, this.bulletHeight)
        this.move()
    }

    move() {
        this.posX += this.velX
    }
}