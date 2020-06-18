class Player {
    constructor(ctx, w, h, keys, frames) {
        this.ctx = ctx

        this.canvasSize = {
            w: w,
            h: h
        }

        this.playerWidth = 150
        this.playerHeight = 175

        this.imageWalk = new Image()
        this.imageWalk.src = "img/player.png"
        this.imageWalk.frames = 14
        this.imageWalk.framesIndex = 0

        this.imageDamage = new Image()
        this.imageDamage.src = "img/playerdmg.png"
        this.imageDamage.frames = 14
        this.imageDamage.framesIndex = 0

        this.isDamage = false

        this.soundShoot = new Audio("music/shoot2.mp3")
        this.soundReload = new Audio("music/reload.mp3")

        this.posX = 50
        this.posY0 = this.canvasSize.h - this.playerHeight - 100
        this.posY = this.posY0
        this.posY1 = this.posY0

        this.velY = 2
        this.gravity = 0.2

        this.keys = keys

        this.bullets = []
        this.revolverCharger = 6
        this.frames = frames

        this.playerLifes = 20
        
        this.setListeners()
    }

    drawSelector(framescounter) {
        this.isDamage === true ? this.drawDamage(framescounter) : this.drawWalk(framescounter)
    }

    drawWalk(framescounter) {
        this.ctx.drawImage(this.imageWalk, 
        this.imageWalk.framesIndex * Math.floor(this.imageWalk.width / this.imageWalk.frames),
        0,
        Math.floor(this.imageWalk.width / this.imageWalk.frames),
        this.imageWalk.height,
        this.posX, 
        this.posY, 
        this.playerWidth, 
        this.playerHeight)

        this.animateWalk(framescounter)
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
        this.move()
    }

    drawDamage(framescounter) {
        this.ctx.drawImage(this.imageDamage, 
        this.imageDamage.framesIndex * Math.floor(this.imageDamage.width / this.imageDamage.frames),
        0,
        Math.floor(this.imageDamage.width / this.imageDamage.frames),
        this.imageDamage.height,
        this.posX, 
        this.posY, 
        this.playerWidth, 
        this.playerHeight)

        this.animateDamage(framescounter)
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
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

    animateDamage(framescounter) {
        if(framescounter % 5 == 0) {
            this.imageDamage.framesIndex++
        }
        if(this.imageDamage.framesIndex > this.imageDamage.frames -1) {
            this.imageDamage.framesIndex = 0
        }
    }

    move() {
        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += this.gravity;
            
        } else {
            this.posY = this.posY0;
            this.velY = 1;
        }
    }

    setListeners() {
        document.addEventListener("keydown", e => {
            switch(e.keyCode) {
                case this.keys.LEFT:
                    if(this.posX >= 1) {
                        this.posX -= 10
                    }
                    break;

                case this.keys.RIGHT:
                    if(this.posX <= this.canvasSize.w - this.playerWidth) {
                        this.posX += 10
                    }
                    break;
                
                case this.keys.SPACE:
                    if (this.posY == this.posY0) {
                        this.jump()
                    }
                    break;

                case this.keys.B:
                    this.shoot()
                    break;
                
                case this.keys.N:
                    this.reload()
                    break;
            }
        })
    }

    jump() {
        this.posY -= 200
        this.velY -= 8
    }

    shoot() {
        if(this.revolverCharger > 0) {
            this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.playerWidth, this.playerHeight))
            this.soundShoot.play()
            this.revolverCharger--
        }
    }

    reload() {
        this.revolverCharger = 6
        this.soundReload.play()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posX <= this.canvasSize.w)
    }
}