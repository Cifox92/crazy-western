class Platforms {
    constructor(ctx, w) {
        this.ctx = ctx
        this.platformWidth = 100 + Math.random() * 100
        this.platformHeight = 50
        this.posX = w
        this.posY = 350
        this.velX = 3

        this.image = new Image()
        this.image.src = "img/Platform1.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.platformWidth, this.platformHeight)
        this.move()
    }

    move() {
        this.posX -= this.velX  
    }
}