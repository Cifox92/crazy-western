window.onload = () => {
    document.getElementById("gameArea").classList.toggle('hidden')
    document.getElementById("start-game").onclick = () => {
        Game.init()
        document.getElementById("gameArea").classList.remove('hidden')
        document.getElementById("gameArea").classList.toggle('appearGame')
        document.getElementById("intro").classList.toggle('hidden')
    }
}