clippy.load('Clippy', async function (agent) {

    // Do anything with the loaded agent;
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    agent.moveTo(x, y)
    agent.show()

    const inter = setInterval(async function () {
      agent.speak("Click me to login.")
    }, 2500)

  var loginWindow = document.getElementById('login');
  loginWindow.style.position = "absolute";
  loginWindow.style.left = (x - 250)+'px';
  loginWindow.style.top = (y - 400)+'px';

  var signupWindow = document.getElementById('signup');
  signupWindow.style.position = "absolute";
  signupWindow.style.left = (x - 250)+'px';
  signupWindow.style.top = (y - 400)+'px';

    let clippyElement = document.querySelector(".clippy")
    clippyElement.addEventListener("click", function () {
      document.querySelector("#login").style.display = "inline-block"
      clearInterval(inter)
    })

    function playMusic() {
      nuclear.play();
      nuclear1.play();
    }

  document.querySelector("#signupInstead").addEventListener("click",function(){
      document.querySelector("#login").style.display = "none"
      document.querySelector("#signup").style.display = "inline-block"
  })

  dangers = document.querySelectorAll(".btn-danger")
  dangers.forEach(function(danger){
    danger.addEventListener("click", function(){


    agent.speak("t̶̺̖͛̽̅̈́͘͝ă̵̢̮̺͍͓̰͉̣̮̰͆̿̒̐̆̔̽ś̸̳̒̉͌̀̓̅͗͒̅͘͝͠ǩ̵̯̿̑̒̽͌̎͛͘ ̴̢̩̭̹͍̜͔̓̀̊́̐̂̍͆́͛f̸̬̍̊̀̿̕ạ̵̯̈͐͑̈̇i̴̦̰̜͖͔̟̪̲̱̾̾̀͛̌̈́͘ḽ̴͎̜̆̃̀̂́̚e̵̼̬͈͛d̶̡̛̫͍̙̫̣̳̠̥͙̲̈͋̆̂͒̈̈͘ ̶̢͓̮̲͔͇̬͚̞͍̠̤̞͇̬͛́̏̌̑̂s̴͙̥̣̭͇̯̔͐̽̈́͆̅̊̄̏̚͜͝ụ̵̢̨͈̱̝̣̱̲͂͆͊̊ç̷̞̭̟̭̬̱̯̍̃̅͆̈́̍̃̀̓̄̉͊̌͘͝c̵̫̩̐̏̐͂͂̿̓̂̀̈́̈̀̀͌͠ë̸̳̬̠̪̫̦͇̺s̷̡̨̰̻͙̖̯̹̬̫͖̐͗̐͋̽̽̅̉̚͘ͅs̶̨̙̹̯̐̅͗̄̿f̷̧̹̮̺͉̥̯̪̲̯̠͉͕͙̀͘u̴̠̱͈̝̗̪̼̙̣̞̹̿̿̃̇͜ļ̸̨̯̦̫̝̲̦̝̲͔̀̆̊̀̅̿́̑́̀͐̚͜͜ḽ̵̨̘̦̘͈͋̀̎̃̾̋̃̆̔̚͘y̸̺͚̭͎̹͐̓̀̽͐̆̆̄")


    document.querySelector("#login").style.display = "none"

    document.querySelector("#chaos").style.display = "inline-block"

    document.querySelector("body").style.backgroundImage = "url(images/background-alternative.png)"

    playMusic()
    })
  })

  document.querySelector("#loginInstead").addEventListener("click", function(){
    document.querySelector("#login").style.display = "inline-block"
    document.querySelector("#signup").style.display = "none"
  })

  document.querySelector("#loginButton").addEventListener("click", async function(){
      const username = (document.querySelector("#usernameLogin").value)
      const password = (document.querySelector("#passwordLogin").value)
      await fetch('api/user/login', {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username:username,password:password})
      })
      window.location.href = '/'
  })

})