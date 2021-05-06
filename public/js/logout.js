document.querySelector("#logoutButton").addEventListener("click", async function(){
    await fetch('api/user/logout', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
    })
    location.reload()
    window.location.replace("/")
})