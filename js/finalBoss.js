class FinalBoss {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this. canvasSize = {
            w: w,
            h: h
        }
        this.finalBossHeight = 300
        this.finalBossWidth = 300
        this.posX = w
        this.posY = this.canvasSize.h - this.finalBossHeight - 100

        this.velX = 1

        this.finalBossLifes = 50

        this.image = new Image()
        this.image.src = "img/finalboss.png"
        this.image.frames = 17
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
        this.finalBossWidth,
        this.finalBossHeight)

        this.animate(framescounter)
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