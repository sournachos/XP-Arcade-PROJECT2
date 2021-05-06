//loads clippy onto main page
clippy.load('Clippy', async function (agent) {
  // Do anything with the loaded agent;
  x = window.innerWidth / 2
  y = window.innerHeight / 2
  agent.moveTo(x, y)
  agent.show()
  //tells you to click
  const inter = setInterval(async function () {
    agent.speak("Click me to login.")
  }, 2500)
//puts up log in window
  var loginWindow = document.getElementById('login');
  loginWindow.style.position = "absolute";
  loginWindow.style.left = (x - 250) + 'px';
  loginWindow.style.top = (y - 400) + 'px';
//puts up the window to create user
  var signupWindow = document.getElementById('signup');
  signupWindow.style.position = "absolute";
  signupWindow.style.left = (x - 250) + 'px';
  signupWindow.style.top = (y - 400) + 'px';
//gives functionality to login button
  let clippyElement = document.querySelector(".clippy")
  clippyElement.addEventListener("click", function () {
    document.querySelector("#login").style.display = "inline-block"
    clearInterval(inter)
  })
//plays troll music when you refuse to log in
  function playMusic() {
    nuclear.play();
    nuclear1.play();
  }
//sets login page to signup page where you create user
  document.querySelector("#signupInstead").addEventListener("click", function () {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#signup").style.display = "inline-block"
  })
//sets in motion the trolling when you refuse to log in
  dangers = document.querySelectorAll(".btn-danger")
  dangers.forEach(function (danger) {
    danger.addEventListener("click", async function () {
      agent.speak("WINDOWS XP IS A SCARY PLACE")

      setTimeout(() => {
        setTimeout(() => {
          document.querySelector("#login").style.display = "none"
          document.querySelector("#chaos").style.display = "inline-block"
        }, 5000)
        //changes the background image 
        document.querySelector("body").style.backgroundImage = "url(images/background-alternative.png)"

        //clippys words when you refuce to log in


        agent.speak("t̶̺̖͛̽̅̈́͘͝ă̵̢̮̺͍͓̰͉̣̮̰͆̿̒̐̆̔̽ś̸̳̒̉͌̀̓̅͗͒̅͘͝͠ǩ̵̯̿̑̒̽͌̎͛͘ ̴̢̩̭̹͍̜͔̓̀̊́̐̂̍͆́͛f̸̬̍̊̀̿̕ạ̵̯̈͐͑̈̇i̴̦̰̜͖͔̟̪̲̱̾̾̀͛̌̈́͘ḽ̴͎̜̆̃̀̂́̚e̵̼̬͈͛d̶̡̛̫͍̙̫̣̳̠̥͙̲̈͋̆̂͒̈̈͘ ̶̢͓̮̲͔͇̬͚̞͍̠̤̞͇̬͛́̏̌̑̂s̴͙̥̣̭͇̯̔͐̽̈́͆̅̊̄̏̚͜͝ụ̵̢̨͈̱̝̣̱̲͂͆͊̊ç̷̞̭̟̭̬̱̯̍̃̅͆̈́̍̃̀̓̄̉͊̌͘͝c̵̫̩̐̏̐͂͂̿̓̂̀̈́̈̀̀͌͠ë̸̳̬̠̪̫̦͇̺s̷̡̨̰̻͙̖̯̹̬̫͖̐͗̐͋̽̽̅̉̚͘ͅs̶̨̙̹̯̐̅͗̄̿f̷̧̹̮̺͉̥̯̪̲̯̠͉͕͙̀͘u̴̠̱͈̝̗̪̼̙̣̞̹̿̿̃̇͜ļ̸̨̯̦̫̝̲̦̝̲͔̀̆̊̀̅̿́̑́̀͐̚͜͜ḽ̵̨̘̦̘͈͋̀̎̃̾̋̃̆̔̚͘y̸̺͚̭͎̹͐̓̀̽͐̆̆̄")

      playMusic()
      }, 5000);
      //alows clippy to be change to other xp 'helpers'
      var availableAgents = ['Bonzi', 'Clippy', 'F1', 'Genie', 'Genius', 'Links', 'Merlin', 'Peedy', 'Rocky', 'Rover']
      //chaos speech for clippy 
      var talks = [
        'Life is meaningless',
        'Your life is a lie',
        'CHUTHULU ACCEPTS YOUR SACRIFICE',
        'I AM DEAD',
      ]

      const randPos = () => .2 + Math.random() * .6

      function nextAgent() {
        let agentName = availableAgents.pop()
        if (!agentName) return;

        clippy.load(agentName, agent => {
          window[agentName] = agent
          const move = () => {
            agent.moveTo($(document).width() * randPos(), $(document).height() * randPos())
          }
          move()
          agent.show();
          // Speak on click and start
          const speak = () => {
            agent.speak('I am ' + agentName + ', ' + talks[~~(Math.random() * talks.length)])
            agent.animate()
          }
          $(agent._el).click(() => speak())
          speak()
          // Animate randomly
          setInterval(() => {
            agent.animate()
          }, 3000 + (Math.random() * 4000))
          // Move randomly
          setInterval(() => {
            move()
          }, 3000 + (Math.random() * 4000))
          setTimeout(nextAgent, 2000)
        });
      }
      nextAgent()
    })
  })
//takes you from the user creation page back to login page
  document.querySelector("#loginInstead").addEventListener("click", function () {
    document.querySelector("#login").style.display = "inline-block"
    document.querySelector("#signup").style.display = "none"
  })
//creates login function taking the user input and cross referencing to the DB for 'user'
  document.querySelector("#loginButton").addEventListener("click", async function (event) {
    event.preventDefault()
    const username = (document.querySelector("#usernameLogin").value)
    const password = (document.querySelector("#passwordLogin").value)
    await fetch('api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
    location.reload()
  })
//creates function to take user input and make a new user in the DB
  document.querySelector("#createAccount").addEventListener("click", async function () {
    const username = (document.querySelector("#usernameSignUp").value)
    const password = (document.querySelector("#passwordSignUp").value)
    const passwordCheck = (document.querySelector("#passwordCheck").value)

    if (passwordCheck === password) {
      await fetch('api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      })
      location.reload()
    }
    else {
      alert("Passwords do not match")
    }
  })

})
