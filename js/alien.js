class Alien {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.canvasSize = {
            w: w,
            h: h
        }
        this.alienHeight = 200
        this.alienWidth = 125
        this.posX = w
        this.posY = this.canvasSize.h - this.alienHeight - 200

        this.vel = {
            x: 3,
            y: 3
        }

        this.gravity = 0.2

        this.alienLifes = 2

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
        this.alienLifes <= 0 ? this.drawDead(framescounter) : this.drawWalk(framescounter)
    }

    drawWalk(framescounter) {
        this.ctx.drawImage(this.imageWalk, 
        this.imageWalk.framesIndex * Math.floor(this.imageWalk.width / this.imageWalk.frames),
        0,
        Math.floor(this.imageWalk.width / this.imageWalk.frames),
        this.imageWalk.height,
        this.posX,
        this.posY,
        this.alienWidth,
        this.alienHeight)

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
        this.alienWidth,
        this.alienHeight)
    
        this.animateDead(framescounter)
        this.move()
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
        this.posX -= this.vel.x
        this.vel.y += this.gravity
        this.posY += this.vel.y

        this.posY > this.canvasSize.h - this.alienHeight - 100 ? this.vel.y *= -1 : null
    }
}