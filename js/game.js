const Game = {
    name: 'Crazy Western!',
    description: 'Crazy western',
    version: '1.0.0',
    author: 'Victor Sánchez y David Roel',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    frames: 0,
    FPS: 60,
    obstacles: [],
    mouse: [],
    horse: undefined,
    background: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        SPACE: 32,
        ALT: 18
    },

    init() {
        this.canvasDom = document.getElementById("myCanvas")
        this.canvasSize.w = this.canvasDom.getAttribute('width')
        this.canvasSize.h = this.canvasDom.getAttribute('height')
        this.ctx = this.canvasDom.getContext("2d")
        this.start()
    },

    start() {

        this.interval = setInterval(() => {
            this.drawAll()
            
        }, 1000 / this.FPS);
    },

    drawAll() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.background.draw()
        
    },

    clear() {

    },

    generateObstacles() {

    },

    clearObstacles() {

    },

    isCollision() {
        /*return this.obstacles.some(obs => {
            return (
              this.player.posX + this.player.width >= obs.posX &&
              this.player.posY + this.player.height >= obs.posY &&
              this.player.posX <= obs.posX + obs.width
            );
        })*/
    }
}