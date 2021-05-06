//loading clippy onto the home 'login' page and tells you when you are logged in
clippy.load('Clippy', async function (agent) {
    // Do anything with the loaded agent
    agent.show()
    agent.speak("You are logged in!")
    document.querySelector(".clippy").addEventListener("click", async function () {
        agent.speak("You are logged in!")
    })
});

//loads rover when logged in and give allows him to play a song
clippy.load('Rover', async function (agent) {
    // Do anything with the loaded agent;
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    agent.moveTo(x, y + 100)
    agent.show()
    const inter = setInterval(async function () {
        agent.speak("CLICK ME FOR A FUN SONG!")
    }, 5000)
})