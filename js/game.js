const Game = {
    name: 'Crazy Western!',
    description: 'Crazy western',
    version: '1.0.0',
    author: 'Víctor Sánchez y David Roel',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    frames: 0,
    framesFinal: 2000,
    FPS: 60,
    music: new Audio("music/la_muerte_tenia_un_precio.mp3"),
    score: 0,
    coins: 0,
    martiansKilled: 0,
    obstacles: [],
    martians: [],
    alien: [],
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
        B: 66,
        N: 78,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13
    },

    init() {
        this.canvasDom = document.getElementById("myCanvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setDimensions()
        this.start()
        this.music.loop = true
        this.music.play()
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

            this.frames++

            this.frames > this.framesFinal ? this.finalBoss.drawSelector(this.frames) : null

            this.collisionAll()

            this.player.playerLifes < 1 ? this.finishGame() : null
            
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "img/Mars2.jpg")
        this.player = new Player(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.frames)
        this.finalBoss = new FinalBoss(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.obstacles = []
        this.platforms = []
        this.martians = []
        this.alien = []
        this.babies = []
        this.frames = 0
        this.score = 0
        this.coins = 0
        this.martiansKilled = 0
    },

    drawAll() {
        this.background.draw()
        this.player.drawSelector(this.frames)
        this.obstacles.forEach(obs => obs.draw())
        this.platforms.forEach(plat => plat.draw())
        this.babies.forEach(bab => bab.draw())
        this.martians.forEach(mar => mar.drawSelector(this.frames))
        this.alien.forEach(ali => ali.drawSelector(this.frames))

        this.ctx.fillStyle = 'white'
        this.ctx.font = '25px sans-serif'
        this.ctx.fillText(`Lifes: ${this.player.playerLifes}`, 70, 35)
        this.ctx.fillText(`Score: ${this.score}`, this.canvasSize.w - 200, 35)
        this.ctx.fillText(`Coins: ${this.coins}`, this.canvasSize.w - 360, 35)
        this.ctx.fillText(`Martians killed: ${this.martiansKilled}`, this.canvasSize.w - 610, 35)
        this.ctx.fillText(`Bullets: ${this.player.revolverCharger}`, 200, 35)
    },

    collisionAll() {
        this.isCollisionObs()
        this.isCollisionPlatform()
        this.isCollisionBaby()
        this.isCollisionEnemy()
        this.isCollisionFB()
        this.hitBullet()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generateElem() {
        if((this.frames % 100 === 0) && (this.frames % 7 === 0) && (this.frames < this.framesFinal)) {
            this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.player.posY1, this.player.playerHeight))
        }

        if(this.frames % 300 === 0) {
            this.platforms.push(new Platforms(this.ctx, this.canvasSize.w))
        }

        if((this.frames % 50 === 0) && (this.frames % 3 === 0) && (this.frames < this.framesFinal)) {
            this.generateEnemies()
        }

        if((this.frames % 50 === 0) && (this.frames % 3 === 0)) {
            this.babies.push(new Babies(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
    },

    generateEnemies() {
        let random = Math.floor(Math.random() * (11 - 1) + 1)

        if(random >= 1 && random <= 7) {
            this.martians.push(new Martian(this.ctx, this.canvasSize.w, this.canvasSize.h))
        } else {
            this.alien.push(new Alien(this.ctx, this.canvasSize.w, this.canvasSize.h))
        }
    },

    clearElem() {
        this.obstacles = this.obstacles.filter(obs => obs.posX >= - obs.obstacleWidth)
        this.martians = this.martians.filter(mar => mar.posX >= - mar.martianWidth)
        this.alien = this.alien.filter(ali => ali.posX >= - ali.alienWidth)
        this.platforms = this.platforms.filter(plat => plat.posX >= - plat.platformWidth)
        this.babies = this.babies.filter(bab => bab.posY < this.player.posY1 + bab.babyHeight + 20)
    },

    isCollisionObs() {
        this.obstacles.some(obs => {
            if (this.player.posX < obs.posX + obs.obstacleWidth - 50 && //colisión derecha
                this.player.posX + this.player.playerWidth > obs.posX + 50 && //colisión izda
                this.player.posY < obs.posY + obs.obstacleHeight && //colision abajo
                this.player.playerHeight + this.player.posY > obs.posY + 70) { //colision arriba

                this.player.playerLifes = 0
            }
        })
    },

    isCollisionBaby() {
        this.babies.some(bab => {
            if (this.player.posX < bab.posX + bab.babyWidth - 50 && //colisión derecha
                this.player.posX + this.player.playerWidth > bab.posX + 50 && //colisión izda
                this.player.posY < bab.posY + bab.babyHeight - 70 && //colision abajo
                this.player.playerHeight + this.player.posY > bab.posY + 30) { //colision arriba
                
                let numberOfBaby = this.babies.indexOf(bab)
                this.babies.splice(numberOfBaby, 1)
                this.score += 20
                this.coins += 20
                this.addLifes()
            }
        })
    },

    isCollisionEnemy() {
        this.martians.some(mar => {
            if ((this.player.posX < mar.posX + mar.martianWidth - 50 && //colisión derecha
                this.player.posX + this.player.playerWidth > mar.posX + 50 && //colisión izda
                this.player.posY < mar.posY + mar.martianHeight - 70 && //colision abajo
                this.player.playerHeight + this.player.posY > mar.posY + 30) && (mar.martianLifes > 0)) { //colision arriba
                
                mar.martianLifes = 0
                this.killMartian(mar)
                this.player.playerLifes--
                this.damagePlayer()
            }
        })

        this.alien.some(ali => {
            if ((this.player.posX < ali.posX + ali.alienWidth - 50 && //colisión derecha
                this.player.posX + this.player.playerWidth > ali.posX + 50 && //colisión izda
                this.player.posY < ali.posY + ali.alienHeight - 70 && //colision abajo
                this.player.playerHeight + this.player.posY > ali.posY + 30) && (ali.alienLifes > 0)) { //colision arriba
                
                ali.alienLifes = 0
                this.killAlien(ali)
                this.player.playerLifes--
                this.damagePlayer()
            }
        })
    },

    isCollisionFB() {
        if ((this.player.posX < this.finalBoss.posX + this.finalBoss.finalBossWidth - 50 &&
            this.player.posX + this.player.playerWidth > this.finalBoss.posX + 50 && 
            this.player.posY < this.finalBoss.posY + this.finalBoss.finalBossHeight - 70 && 
            this.player.playerHeight + this.player.posY > this.finalBoss.posY + 30) && (this.finalBoss.finalBossLifes > 0)) { 

            this.player.playerLifes -= 2

            this.finalBoss.velX = this.finalBoss.reloadVel
            this.damagePlayer()
        }
    },

    isCollisionPlatform() {
        this.platforms.some(plat => {
            if(this.player.posX < plat.posX + plat.platformWidth - 50 && //colisión derecha
                this.player.posX + this.player.playerWidth > plat.posX + 50 && //colisión izda
                this.player.posY < plat.posY + plat.platformHeight - 50 && //colision abajo
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
                if ((bul.posX + bul.bulletWidth >= mar.posX + 25 && 
                    bul.bulletHeight + bul.posY > mar.posY + 70 &&
                    bul.posX < mar.posX + mar.martianWidth - 25 &&
                    bul.posY < mar.posY + mar.martianHeight) && mar.martianLifes > 0) {

                    let numberOfBullet = this.player.bullets.indexOf(bul)
                    this.player.bullets.splice(numberOfBullet, 1)
                    mar.martianLifes--
                    
                    this.killMartian(mar)
                }
            })
        })

        this.alien.some(ali => {
            this.player.bullets.forEach(bul => {
                if ((bul.posX + bul.bulletWidth >= ali.posX + 25 && 
                    bul.bulletHeight + bul.posY > ali.posY + 70 &&
                    bul.posX < ali.posX + ali.alienWidth - 25 &&
                    bul.posY < ali.posY + ali.alienHeight) && ali.alienLifes > 0) {

                    let numberOfBullet = this.player.bullets.indexOf(bul)
                    this.player.bullets.splice(numberOfBullet, 1)
                    ali.alienLifes--
                    
                    this.killAlien(ali)
                }
            })
        })

        this.player.bullets.some(bul => {
            if (bul.posX + bul.bulletWidth >= this.finalBoss.posX + 25 && 
                bul.bulletHeight + bul.posY > this.finalBoss.posY + 70 &&
                bul.posX < this.finalBoss.posX + this.finalBoss.finalBossWidth - 25 &&
                bul.posY < this.finalBoss.posY + this.finalBoss.finalBossHeight) {

                let numberOfBullet = this.player.bullets.indexOf(bul)
                this.player.bullets.splice(numberOfBullet, 1)
                this.finalBoss.finalBossLifes--
                
                this.killFinalBoss()
            }
        })

        this.finalBoss.lasers.some(las => {
            if (las.posX + las.laserWidth >= this.player.posX + 25 && 
                las.laserHeight + las.posY > this.player.posY + 70 &&
                las.posX < this.player.posX + this.player.playerWidth - 25 &&
                las.posY < this.player.posY + this.player.playerHeight) {

                let numberOfLaser = this.finalBoss.lasers.indexOf(las)
                this.finalBoss.lasers.splice(numberOfLaser, 1)
                this.player.playerLifes--
                this.damagePlayer()

            }
        })
    },

    damagePlayer() {
        this.player.isDamage = true
        setTimeout(()=>{
            this.player.isDamage = false
        }, 2000)
    },

    killFinalBoss() {
        if(this.finalBoss.finalBossLifes === 0) {
            this.score += 200
            this.martiansKilled++
            setTimeout(() => this.finishGame(), 4000)
        }
    },

    killMartian(mar) {
        if(mar.martianLifes === 0) {
            this.score += 5
            this.coins += 5
            this.martiansKilled++

            let numberOfMartian = this.martians.indexOf(mar)
            setTimeout(() => this.martians.splice(numberOfMartian, 1), 750)
            this.addLifes()
        }
    },
    
    killAlien(ali) {
        if(ali.alienLifes === 0) {
            this.score += 10
            this.coins += 10
            this.martiansKilled++

            let numberOfAlien = this.alien.indexOf(ali)
            setTimeout(() => this.alien.splice(numberOfAlien, 1), 750)
            this.addLifes()
        }
    },

    addLifes() {
        if(this.coins >= 150) {
            this.coins -= 150
            this.player.playerLifes++
        }
    },
    
    finishGame() {
        this.ctx.drawImage(this.background.gameOverImage, 0, 10, this.canvasSize.w, this.canvasSize.h - 20)
        
        this.ctx.fillStyle = 'black'
        this.ctx.font = '100px Sancreek'
        
        if(this.player.playerLifes > 0) {
            this.ctx.fillText(`YOU WIN!!`, this.canvasSize.w / 2 - 220, this.canvasSize.h / 2 - 100)
        } else {
            this.ctx.fillText(`Game Over`, this.canvasSize.w / 2 - 240, this.canvasSize.h / 2 - 100)
        }
        
        this.ctx.font = '60px Sancreek'
        this.ctx.fillText(`Score: ${this.score}`, this.canvasSize.w / 2 - 120, this.canvasSize.h / 2 + 10)
        this.ctx.fillText(`Martians Killed: ${this.martiansKilled}`, this.canvasSize.w / 2 - 240, this.canvasSize.h / 2 + 100)
        
        this.ctx.font = '40px Sancreek'
        this.ctx.fillText(`Press ENTER to restart the game`, this.canvasSize.w / 2 - 300, this.canvasSize.h / 2 + 200)

        document.addEventListener("keydown", e => {
            if (e.keyCode == this.keys.ENTER) {
                location.reload()                    
            }
        })
        clearInterval(this.interval)
    }
}
