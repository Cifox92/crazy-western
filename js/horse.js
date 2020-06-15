class Horse {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx

        this.canvasSize = {
            w: w,
            h: h
        }

        this.horseWidth = 150
        this.horseHeight = 150

        this.image = new Image()
        this.image.src = "img/horse.png"
        this.image.frames = ""
        this.image.framesIndex = ""

        this.posX = 50
        this.posY0 = this.canvasSize.h - this.horseHeight - 100
        this.posY = this.posY0
        this.posY1 = this.posY0

        this.velY = 2
        this.gravity = 0.2

        this.keys = keys

        this.bullets = []

        this.horseLifes = 3
        
        this.setListeners()
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.horseWidth, this.horseHeight)
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
        this.move()
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
                    this.posX -= 10
                    break;

                case this.keys.RIGHT:
                    this.posX += 10
                    break;
                
                case this.keys.SPACE:
                    if (this.posY == this.posY0) {
                        this.jump()
                    }
                    break;

                case this.keys.ALT:
                    this.shoot()
                    break;
            }
        })
    }

    jump() {
        this.posY -= 200
        this.velY -= 8
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.horseWidth, this.horseHeight))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posX <= this.canvasSize.w)
    }
}