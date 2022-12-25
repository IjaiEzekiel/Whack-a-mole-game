const squares = document.querySelectorAll('.square')
const startPauseButton = document.querySelector('#start-pause-button')
const mole = document.querySelector('.mole')
const finalScore = document.querySelector('.high-score')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId =null

let highScore = 0;

// retrieve high score from local storage
const storedHighScore = localStorage.getItem('highScore');
if (storedHighScore) {
  highScore = storedHighScore;
}

function randomSquare () {
  squares.forEach(square => {
  square.classList.remove('mole')
  }) 
  let randomSquare = squares[Math.floor(Math.random()*9)]
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id 
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {

  if (square.id == hitPosition) {
    result++
    score.textContent = result
    hitPosition = null
  }
 })

})
function moveMole () {
 timerId = setInterval(randomSquare, 500)
}

moveMole()

function countDown () {
  currentTime--
  timeLeft.textContent = currentTime

function loop() {
      if (result > highScore) {
            highScore = result;
          }
        // save high score to local storage
      localStorage.setItem('highScore', highScore);
      requestAnimationFrame(loop);

  if (currentTime == 0) {
    clearInterval(counDownTimerId)
    clearInterval(timerId)
    finalScore.innerHTML = 'GAME OVER! Your final score is ' + result + '<br>' + 'High Score:' + highScore
    startPauseButton.innerHTML = "Restart"
    startPauseButton.addEventListener('click', () => {
      location.reload()
    })
  }
}
requestAnimationFrame(loop);
}


let counDownTimerId = setInterval(countDown, 1000)

startPauseButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(counDownTimerId)
    clearInterval(timerId)
    startPauseButton.innerHTML = "Resume"
    timerId = null
    outcomeTimerId = null
    // currentTime = null
  } else {
    timerId = setInterval(randomSquare, 500)
    counDownTimerId = setInterval(countDown, 1000)
    startPauseButton.innerHTML = "Pause"
  }
})

  