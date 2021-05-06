clippy.load('Clippy', async function(agent){
    // Do anything with the loaded agent
    agent.show()
    agent.speak("You are logged in!")
    document.querySelector(".clippy").addEventListener("click", async function(){
        agent.speak("You are logged in!")
    })
});

document.querySelector("#logoutButton").addEventListener("click", async function(){
    await fetch('api/user/logout', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
    })
    location.reload()
})