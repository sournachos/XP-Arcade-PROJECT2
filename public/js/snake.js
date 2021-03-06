// Credits to Chris DeLeon of HomeTeam GameDev for this code
//https://www.youtube.com/watch?v=xGmXxpIj6vs
clippy.load('Genie', async function (agent) {
    // Do anything with the loaded agent;
    x = window.innerWidth * 0.75
    y = window.innerHeight * 0.2
    agent.show()
    agent.moveTo(x, y)
    const inter = setInterval(async function () {
        agent.speak("I SURE DOTH LOVE SNAKE!")
        agent.animate()
    }, 15000)
  })


window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    const playagain2 = document.querySelector('#playagain2')
    const result1 = document.querySelector('#result1')
    const game1 = setInterval(game, 1000 / 15);
}
px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = [];
tail = 5;
function game() {
    px += xv;
    py += yv;
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        //when you loose reset the legnth to 5
        if (trail[i].x == px && trail[i].y == py) {
            tail = 5;
        }
    }

    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }
    //lengthen tail on hitting square
    if (ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            xv = -1; yv = 0;
            break;
        case 38:
            xv = 0; yv = -1;
            break;
        case 39:
            xv = 1; yv = 0;
            break;
        case 40:
            xv = 0; yv = 1;
            break;
    }
}
