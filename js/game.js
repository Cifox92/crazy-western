const Game = {
    name: 'Crazy Western!',
    description: 'Crazy western',
    version: '1.0.0',
    author: 'Víctor Sánchez y David Roel',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    frames: 0,
    FPS: 60,
    music: new Audio("music/la_muerte_tenia_un_precio.mp3"),
    obstacles: [],
    martians: [],
    platforms: [],
    horse: undefined,
    background: undefined,
    canvasSize: {
        w: 1500,
        h: 700
    },
    keys: {
        SPACE: 32,
        ALT: 18,
        LEFT: 37,
        RIGHT: 39
    },

    init() {
        this.canvasDom = document.getElementById("myCanvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setDimensions()
        this.start()
        //this.music.loop = true
        //this.music.play()
    },

    setDimensions() {
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()

            this.generateElem()
            this.clearElem()

            this.frames > 6000 ? this.frames = 0 : this.frames++

            this.isCollisionObs()
            this.isCollisionPlatform()
            this.hitBullet()
            
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "img/Mars2.jpg")
        this.horse = new Horse(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys)
        this.obstacles = []
        this.platforms = []
    },

    drawAll() {
        this.background.draw()
        this.horse.draw()
        //this.obstacles.forEach(obs => obs.draw())
        this.platforms.forEach(plat => plat.draw())
        this.martians.forEach(mar => mar.draw(this.frames))
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generateElem() {
        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.horse.posY1, this.horse.horseHeight))
        }

        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.platforms.push(new Platforms(this.ctx, this.canvasSize.w))
        }

        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.martians.push(new Martian(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
    },

    clearElem() {
        this.obstacles = this.obstacles.filter(obs => obs.posX >= - obs.obstacleWidth)
        this.martians = this.martians.filter(mar => mar.posX >= - mar.martianWidth)
        this.platforms = this.platforms.filter(plat => plat.posX >= - plat.platformWidth)
    },

    isCollisionObs() {
        this.obstacles.some(obs => {
            if (this.horse.posX < obs.posX + obs.obstacleWidth -50 && //colisión por la derecha
                this.horse.posX + this.horse.horseWidth > obs.posX + 50 && //colisión por la izda
                this.horse.posY < obs.posY + obs.obstacleHeight && //colision abajo
                this.horse.horseHeight + this.horse.posY > obs.posY + 70) { //colision arriba
                alert("Game Over")
            }
        })
    },

    isCollisionPlatform() {
        this.platforms.some(plat => {
            if(this.horse.posX < plat.posX + plat.platformWidth -50 && //colisión por la derecha
                this.horse.posX + this.horse.horseWidth > plat.posX + 50 && //colisión por la izda
                this.horse.posY < plat.posY + plat.platformHeight && //colision abajo
                this.horse.horseHeight + this.horse.posY > plat.posY + 20) {

                this.horse.posY0 = plat.posY - this.horse.horseHeight

            } else if(this.horse.posX > plat.platformWidth + plat.posX) {
                this.horse.posY0 = this.horse.posY1
            }
        })
    },

    hitBullet() {
        this.martians.some(mar => {
            this.horse.bullets.forEach(bul => {
                if (bul.posX + bul.bulletWidth >= mar.posX + 25 && 
                    bul.bulletHeight + bul.posY > mar.posY + 70 &&
                    bul.posX < mar.posX + mar.martianWidth - 25 &&
                    bul.posY < mar.posY + mar.martianHeight) {

                    let numberOfBullet = this.horse.bullets.indexOf(bul)
                    this.horse.bullets.splice(numberOfBullet, 1)
                    mar.martianLifes--
                    
                    this.killMartian()
                }
            })
        })
    },

    killMartian() {
        this.martians.forEach(mar => {
            if(mar.martianLifes === 0) {
                let numberOfMartian = this.martians.indexOf(mar)
                this.martians.splice(numberOfMartian, 1)
            }
        })
    },

    gameOver() {

    },
}