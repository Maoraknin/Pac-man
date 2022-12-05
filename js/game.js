'use strict'

const WALL = '<img class="wall" src="image/wall.jpg" alt="">'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '⚪'
const CHERRY ='🍒'

const gGame = {}

var gBoard
var gIntervalCherry

function onInit() {
    PACMAN = '<img class="pacman" src="image/pacman.png">'
    addCherry()
    gGhosts = []
    gGame.score = 0
    gGame.isOn = false
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
    

}

function addCherry(){
    gIntervalCherry = setInterval(() =>{
       const emptyCells = getEmptyCells()
       if(emptyCells.length === 0) return
       const cell = drawRandNum(emptyCells)
       console.log('cell:',cell)
       gBoard[cell.i][cell.j] = CHERRY
       renderCell(cell, CHERRY)
    },15000)
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.isOn = false
    var elBtn = document.querySelector('button')
    elBtn.classList.remove('hidden')
}

function restartBtn(){
    var elBtn = document.querySelector('button')
    elBtn.classList.add('hidden')
    onInit()
    document.querySelector('h2').innerHTML =`Score: <span>${gGame.score}</span>`

}

