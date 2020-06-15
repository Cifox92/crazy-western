class Bullets {
    constructor(ctx, horsePositionX, horsePositionY, horseWidth, horseHeight) {
        this.ctx = ctx
        this.posX = horsePositionX + horseWidth
        this.posY = horsePositionY + horseHeight / 2
        this.horseHeight = horseHeight

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