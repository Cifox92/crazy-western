class Background {
  constructor(ctx, w, h, imgSource) {
    this.ctx = ctx
    this.w = w
    this.h = h
    this.image = new Image()
    this.image.src = imgSource
    this.gameOverImage = new Image()
    this.gameOverImage.src = "img/BGgameover.png"
    this.posX = 0
    this.posY = 0
    this.velX = 2
    this.canvasSize = {
      w: w,
      h: h
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.canvasSize.w, this.canvasSize.h)
    this.ctx.drawImage(this.image, this.posX + this.canvasSize.w, this.posY, this.canvasSize.w, this.canvasSize.h)
    this.move()
  }

  move() {
    if(this.posX <= -this.w) {
      this.posX = 0
    }
    this.posX -= this.velX
  }
}