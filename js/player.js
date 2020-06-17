class Player {
    constructor(ctx, w, h, keys, frames) {
        this.ctx = ctx

        this.canvasSize = {
            w: w,
            h: h
        }

        this.playerWidth = 150
        this.playerHeight = 175

        this.image = new Image()
        this.image.src = "img/player.png"
        this.image.frames = 14
        this.image.framesIndex = 0

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

    draw(framescounter) {
        this.ctx.drawImage(this.image, 
        this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
        0,
        Math.floor(this.image.width / this.image.frames),
        this.image.height,
        this.posX, 
        this.posY, 
        this.playerWidth, 
        this.playerHeight)

        this.animate(framescounter)
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
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