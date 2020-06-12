class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.w = w
        this.h = h
        this.posX = 0
        this.posY = 0
        this.image = new Image()
        this.image.src = "img/Desert.png"
    }

    draw() {
      this.ctx.drawImage(this.image, this.posX, this.posY, this.w, this.h)
      this.ctx.drawImage(this.image, this.posX + this.w, this.posY, this.w, this.h)
    }

    move() {
        
    }
}


