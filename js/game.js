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
    babies: [],
    player: undefined,
    background: undefined,
    finalBoss: undefined,
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

            this.generateElem()
            this.drawAll()
            this.clearElem()

            this.frames > 6000 ? this.frames = 0 : this.frames++

            this.isCollisionObs()
            this.isCollisionPlatform()
            this.hitBullet()
            
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "img/Mars2.jpg")
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys)
        this.finalBoss = new FinalBoss(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.obstacles = []
        this.platforms = []
        this.martians= []
        this.babies = []
    },

    drawAll() {
        this.background.draw()
        this.player.draw(this.frames)
        //this.obstacles.forEach(obs => obs.draw())
        this.platforms.forEach(plat => plat.draw())
        this.babies.forEach(bab => bab.draw())
        this.martians.forEach(mar => mar.draw(this.frames))
        this.finalBoss.draw(this.frames)
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generateElem() {
        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.player.posY1, this.player.playerHeight))
        }

        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.platforms.push(new Platforms(this.ctx, this.canvasSize.w))
        }

        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.martians.push(new Martian(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }

        if(this.frames % Math.floor(200 + (Math.random() * 400)) === 0) {
            this.babies.push(new Babies(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }

    },

    clearElem() {
        this.obstacles = this.obstacles.filter(obs => obs.posX >= - obs.obstacleWidth)
        this.martians = this.martians.filter(mar => mar.posX >= - mar.martianWidth)
        this.platforms = this.platforms.filter(plat => plat.posX >= - plat.platformWidth)
        this.babies = this.babies.filter(bab => bab.posY == bab.canvasSize.h)
    },

    isCollisionObs() {
        this.obstacles.some(obs => {
            if (this.player.posX < obs.posX + obs.obstacleWidth -50 && //colisión derecha
                this.player.posX + this.player.playerWidth > obs.posX + 50 && //colisión izda
                this.player.posY < obs.posY + obs.obstacleHeight && //colision abajo
                this.player.playerHeight + this.player.posY > obs.posY + 70) { //colision arriba
                alert("Game Over")
            }
        })
    },

    isCollisionBaby() {
        
    },

    isCollisionPlatform() {
        this.platforms.some(plat => {
            if(this.player.posX < plat.posX + plat.platformWidth -50 && //colisión por la derecha
                this.player.posX + this.player.playerWidth > plat.posX && //colisión por la izda
                this.player.posY < plat.posY + plat.platformHeight -50 && //colision abajo
                this.player.playerHeight + this.player.posY > plat.posY + 20) {

                this.player.posY0 = plat.posY - this.player.playerHeight + 10

            } else if(this.player.posX > plat.platformWidth + plat.posX - 50) {
                this.player.posY0 = this.player.posY1
            }
        })
    },

    hitBullet() {
        this.martians.some(mar => {
            this.player.bullets.forEach(bul => {
                if (bul.posX + bul.bulletWidth >= mar.posX + 25 && 
                    bul.bulletHeight + bul.posY > mar.posY + 70 &&
                    bul.posX < mar.posX + mar.martianWidth - 25 &&
                    bul.posY < mar.posY + mar.martianHeight) {

                    let numberOfBullet = this.player.bullets.indexOf(bul)
                    this.player.bullets.splice(numberOfBullet, 1)
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