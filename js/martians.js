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

        this.imageWalk = new Image()
        this.imageWalk.src = "img/alien.png"
        this.imageWalk.frames = 12
        this.imageWalk.framesIndex = 0

        this.imageDead = new Image()
        this.imageDead.src = "img/aliendead.png"
        this.imageDead.frames = 12
        this.imageDead.framesIndex = 0
    }

    drawSelector(framescounter) {
        this.martianLifes <= 0 ? this.drawDead(framescounter) : this.drawWalk(framescounter)
    }

    drawWalk(framescounter) {
        this.ctx.drawImage(this.imageWalk, 
        this.imageWalk.framesIndex * Math.floor(this.imageWalk.width / this.imageWalk.frames),
        0,
        Math.floor(this.imageWalk.width / this.imageWalk.frames),
        this.imageWalk.height,
        this.posX,
        this.posY,
        this.martianWidth,
        this.martianHeight)

        this.animateWalk(framescounter)
        this.move()
    }

    drawDead(framescounter) {
        this.ctx.drawImage(this.imageDead, 
        this.imageDead.framesIndex * Math.floor(this.imageDead.width / this.imageDead.frames),
        0,
        Math.floor(this.imageDead.width / this.imageDead.frames),
        this.imageDead.height,
        this.posX,
        this.posY,
        this.martianWidth,
        this.martianHeight)
    
        this.animateDead(framescounter)
    }

    animateWalk(framescounter) {
        if(framescounter % 5 == 0) {
            this.imageWalk.framesIndex++
        }
        if(this.imageWalk.framesIndex > this.imageWalk.frames -1) {
            this.imageWalk.framesIndex = 0
        }
    }

    animateDead(framescounter) {
        if(framescounter % 5 == 0) {
            this.imageDead.framesIndex++
        }
    }

    move() {
        this.posX -= this.velX
    }
}