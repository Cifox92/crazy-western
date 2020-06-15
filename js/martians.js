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
        this.posY = this.canvasSize.h - this.martianHeight - 100

        this.velX = 5

        this.martianLifes = 3

        this.image = new Image()
        this.image.src = "img/alien.png"
        this.image.frames = 12
        this.image.framesIndex = 0
    }

    draw(framescounter) {
        this.ctx.drawImage(this.image, 
        this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
        0,
        Math.floor(this.image.width / this.image.frames),
        this.image.height,
        this.posX,
        this.posY,
        this.martianWidth,
        this.martianHeight)

        this.animate(framescounter)
        console.log(this.image.framesIndex)
        this.move()
    }

    animate(framescounter) {
        if(framescounter % 5 == 0) {
            this.image.framesIndex++
        }
        if(this.image.framesIndex > this.image.frames -1) {
            this.image.framesIndex = 0
        }
    }

    move() {
        this.posX -= this.velX
    }
}