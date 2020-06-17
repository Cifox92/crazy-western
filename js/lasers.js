class Laser {
    constructor(ctx, fbPositionX, fbHeight) {
        this.ctx = ctx
        this.posX = fbPositionX + 140
        this.posY = 420 
        this.fbHeight = fbHeight

        this.laserWidth = 40
        this.laserHeight = 20

        this.image = new Image()
        this.image.src = "img/laser.png"

        this.vel = {
            x: 10,
            y: 2
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.laserWidth, this.laserHeight)
        this.move()
    }

    move() {
        this.posX -= this.vel.x
        this.posY += this.vel.y
    }
}