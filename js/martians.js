class Martian {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this. canvasSize = {
            w: w,
            h: h
        }
        this.martianHeight = 150
        this.martianWidth = 100
        this.posX = w
        this.posY = this.canvasSize.h - this.martianHeight - 230

        this.velX = 5

        this.martianLifes = 3

        this.image = new Image()
        this.image.src = "img/alien.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.martianWidth, this.martianHeight)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}