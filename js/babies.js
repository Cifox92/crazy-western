class Babies {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.canvasSize = {
            w: w,
            h: h
        }

        this.babyHeight = 70
        this.babyWidth = 70
        this.posX = 400 + Math.floor((Math.random() * 750))
        this.posY = 0 - this.babyHeight
        this.velY = 3

        this.image = new Image()
        this.image.src ="img/babies.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.babyWidth, this.babyHeight)
        this.move()
    }

    move() {
        this.posY += this.velY
    }
}