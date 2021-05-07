document.querySelector("#logoutButton").addEventListener("click", async function () {
    await fetch('api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    playLogin()
    setTimeout(function(){
        location.reload()
        window.location.replace("/")
    },3000)
})

function playLogin(){
    loginaudio.play()
}