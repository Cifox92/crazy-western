window.onload = () => {
    document.getElementById("gameArea").classList.toggle('hidden')
    document.getElementById("easy").onclick = () => {
        Game.init()
        startGame()
    }

    document.getElementById("normal").onclick = () => {
        Game.init()
        Game.player.playerLifes = 10
        Game.framesFinal = 7000
        startGame()
    }

    document.getElementById("hard").onclick = () => {
        Game.init()
        Game.player.playerLifes = 5
        Game.framesFinal = 10000
        Game.finalBoss.finalBossLifes = 40
        startGame()
    }
}

function startGame() {
    document.getElementById("gameArea").classList.remove('hidden')
    document.getElementById("gameArea").classList.toggle('appearGame')
    document.getElementById("intro").classList.toggle('hidden')
}