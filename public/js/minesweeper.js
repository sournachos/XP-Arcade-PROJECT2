document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.minesweeper-grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  const playagain1 = document.querySelector('#playagain1')

  let width = 10
  let bombAmount = 20
  let flags = 0
  let squares = []
  let isGameOver = false

  //create Board
  function createBoard() {
    flagsLeft.innerHTML = bombAmount

    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    // const shuffledArray = gameArray.sort(() => Math.random() -0.5)
    
    for (let i = gameArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [gameArray[i], gameArray[j]] = [gameArray[j], gameArray[i]];
    }
    
    // console.log(gameArray);

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.classList.add('mine-square')
      square.setAttribute('id', i)
      square.classList.add(gameArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function(e) {
        click(square)
      })

      //cntrl and left click
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width -1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
        if (i > 9 && squares[i -width].classList.contains('bomb')) total ++
        if (i > 10 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
        if (i < 99 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
        if (i < 89 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
        if (i < 90 && squares[i +width].classList.contains('bomb')) total ++
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()

  const timerEl = document.querySelector('#timer');
  let time = 0;
  const timer = setInterval(() => {
    if (time >= 999) {
      clearInterval(timer);
    }
    time++;
    timerEl.textContent = time
  }, 1000)

  //add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags ++
        flagsLeft.innerHTML = bombAmount- flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
        flagsLeft.innerHTML = bombAmount- flags
      }
    }
  }

  //click on square actions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data')
      if (total !=0) {
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }


  //check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1].id
        //const newId = parseInt(currentId) - 1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 -width].id
        //const newId = parseInt(currentId) +1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9) {
        const newId = squares[parseInt(currentId -width)].id
        //const newId = parseInt(currentId) -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 -width].id
        //const newId = parseInt(currentId) -1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 99 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1].id
        //const newId = parseInt(currentId) +1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 +width].id
        //const newId = parseInt(currentId) -1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 +width].id
        //const newId = parseInt(currentId) +1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90) {
        const newId = squares[parseInt(currentId) +width].id
        //const newId = parseInt(currentId) +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  //game over
  function gameOver(square) {
    playagain1.style.display = 'block'
    result.innerHTML = 'BOOM! Game Over!'
    isGameOver = true
    clearInterval(timer);

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = "<img width=20 height=20 src='/images/mine.png'>"
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }

  //check for win
  function checkForWin() {
    ///simplified win argument
    let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombAmount) {
        clearInterval(timer);
        playagain1.style.display = 'block'
        result.innerHTML = 'YOU WIN!'
        isGameOver = true
        if(i === squares.length - 1){
          submitScore();
        }
      }
    }
  }

  async function submitScore() {
    const response = await fetch('/api/user/minesweeper', {
      method: 'PUT',
      body: JSON.stringify({ time }),
      headers: {'Content-Type': 'application/json' },
    });

    if(response.ok) {
      // show scores
    } else {
      // do something else
    }
  }
})