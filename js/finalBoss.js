class FinalBoss {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.canvasSize = {
            w: w,
            h: h
        }
        this.finalBossHeight = 500
        this.finalBossWidth = 500
        this.posX = w
        this.posY = this.canvasSize.h - this.finalBossHeight - 80

        this.reloadVel = -10
        this.velX = 4
        
        this.finalBossLifes = 35

        this.lasers = []

        this.soundShoot = new Audio("music/laser.mp3")
        this.soundDead = new Audio("music/sounddead.mp3")

        this.imageWalk = new Image()
        this.imageWalk.src = "img/finalboss.png"
        this.imageWalk.frames = 17
        this.imageWalk.framesIndex = 0

        this.imageDead = new Image()
        this.imageDead.src = "img/finalbossdead.png"
        this.imageDead.frames = 13
        this.imageDead.framesIndex = 0
    }

    drawSelector(framescounter) {
        this.finalBossLifes <= 0 ? this.drawDead(framescounter) : this.drawWalk(framescounter)
    }

    drawWalk(framescounter) {
        this.ctx.drawImage(this.imageWalk, 
        this.imageWalk.framesIndex * Math.floor(this.imageWalk.width / this.imageWalk.frames),
        0,
        Math.floor(this.imageWalk.width / this.imageWalk.frames),
        this.imageWalk.height,
        this.posX,
        this.posY,
        this.finalBossWidth,
        this.finalBossHeight)

        this.animateWalk(framescounter)
        this.move()
        this.shoot(framescounter)
        this.lasers.forEach(laser => laser.draw())
        this.clearLasers()
    }

    drawDead(framescounter) {
        this.ctx.drawImage(this.imageDead, 
        this.imageDead.framesIndex * Math.floor(this.imageDead.width / this.imageDead.frames),
        0,
        Math.floor(this.imageDead.width / this.imageDead.frames),
        this.imageDead.height,
        this.posX,
        this.posY,
        this.finalBossWidth,
        this.finalBossHeight)
    
        this.animateDead(framescounter)
        this.soundDead.play()
        this.move()
    }

    animateWalk(framescounter) {
        if(framescounter % 5 == 0) {
            this.imageWalk.framesIndex++
        }
        if(this.imageWalk.framesIndex > this.imageWalk.frames - 1) {
            this.imageWalk.framesIndex = 0
        }
    }

    animateDead(framescounter) {
        if(framescounter % 5 == 0) {
            this.imageDead.framesIndex++
        }
        if(this.imageDead.framesIndex == 13) {
            this.imageDead.framesIndex--
        }
    }

    move() {
        this.posX -= this.velX

        if(this.posX > 1500 - this.finalBossWidth){
            this.velX = 5
        }
        if(this.finalBossLifes === 0) {
            this.velX = 2
        }
    }

    shoot(framescounter) {
        if(framescounter % 60 === 0 && this.finalBossLifes >= 1) {
            this.lasers.push(new Laser(this.ctx, this.posX, this.finalBossHeight))
            this.soundShoot.play()
        }
        
    }

    clearLasers() {
        this.lasers = this.lasers.filter(laser => laser.posY < 550 + laser.laserHeight)
    }
}