class FinalBoss {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this. canvasSize = {
            w: w,
            h: h
        }
        this.finalBossHeight = 500
        this.finalBossWidth = 500
        this.posX = w
        this.posY = this.canvasSize.h - this.finalBossHeight - 80

        this.reloadVel = -10
        this.velX = 4
        
        this.finalBossLifes = 50

        this.lasers = []

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
        this.shoot(framescounter)
        this.lasers.forEach(laser => laser.draw())
        this.clearLasers()

        console.log(this.lasers)
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

        if(this.posX > 1500 - this.finalBossWidth){
            this.velX = 5
        }
    }

    shoot(framescounter) {
        if(framescounter % 60 === 0) {
            this.lasers.push(new Laser(this.ctx, this.posX, this.posY, this.finalBossWidth, this.finalBossHeight))
        }
    }

    clearLasers() {
        this.lasers = this.lasers.filter(laser => laser.posY < 550 + laser.laserHeight)
    }
}