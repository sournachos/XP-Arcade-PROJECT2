//loads rover when logged in and give allows him to play a song

playing = false

clippy.load('Rover', async function (agent) {
    // Do anything with the loaded agent;
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    agent.moveTo(x, y + 100)
    agent.show()
    const inter = setInterval(function(){
        if (!playing){
            agent.speak("Click me for a fun song")
        }
        else{
            agent.speak("Click me to pause")
        }
    }, 10000)
    document.querySelector(".clippy").addEventListener("click", async function () {
        if (!playing){
            agent.speak("LETS JAM!")
            playMusic()
            playing = true
        }
        else{
            agent.speak("PAUSING")
            stopMusic()
            playing = false
        }
        
    })
})

function playMusic() {
    nuclear.play()
}

function stopMusic(){
    nuclear.pause()
}

