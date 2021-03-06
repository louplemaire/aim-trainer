/**
 * Imports
 */
import './style/main.styl'
import dingAudio from './audios/ding.mp3'
import finishAudio from './audios/finish.mp3'

/**
 * Sounds
 */
const ding = new Audio(dingAudio)
ding.volume = 0.3

const finish = new Audio(finishAudio)
finish.volume = 0.5


/**
 * Elements
 */
const $container = document.querySelector('.aim-trainer')
const $score = $container.querySelector('.score')
const $timer = $container.querySelector('.timer')
const $play = $container.querySelector('.play')
const $bestScore = $container.querySelector('.best-score')
const $targets = $container.querySelector('.targets')
const $scoreValue = $score.querySelector('.value')
const $timerValue = $timer.querySelector('.value')
const $bestScoreValue = $bestScore.querySelector('.value')

/**
 * Start
 */
const start = () =>
{
    $play.classList.add('is-hidden')
    $timer.classList.remove('is-hidden')

    timeLeft = timeDuration

    tick()
    createTarget()
    updateScore(0)
}

/**
 * Tick
 */
const timeDuration = 10
let timeLeft = 0

const tick = () =>
{
    $timerValue.textContent = timeLeft

    timeLeft--

    if(timeLeft < 0){
        end()
    }
    else
    {
        window.setTimeout(tick, 1000)
    }
}

/**
 * End
 */
const end = () =>
{
    $timer.classList.add('is-hidden')
    $play.classList.remove('is-hidden')
    $play.textContent = 'RESTART'

    while($targets.children.length)
    {
        $targets.children[0].remove()
        finish.play()
    }
}

/**
 * Update score
 */
let score = 0
let bestScore = 0

if(window.localStorage.getItem('bestScore') !== null)
{
    bestScore = window.localStorage.getItem('bestScore')
    $bestScoreValue.textContent = bestScore
}


const updateScore = (_value = 0) =>
{
    score = _value
    $scoreValue.textContent = score

    if(score > bestScore)
    {
        bestScore = score
        $bestScoreValue.textContent = bestScore
        window.localStorage.setItem('bestScore', bestScore)
    }
}

/**
 * Create target
 */
const createTarget = () =>
{
    const $target = document.createElement('div')
    $target.classList.add('target')
    $target.style.top = `calc(${Math.random() * 100}% - 5vmin)`
    $target.style.left = `calc(${Math.random() * 100}% - 5vmin)`
    $targets.appendChild($target)

    $target.addEventListener('mouseenter', () => 
    {
        $target.remove()
        createTarget()
        updateScore(score + 1)
        ding.currentTime = 0
        ding.play()
    })
}

/**
 * 
 */
$play.addEventListener('click', start)