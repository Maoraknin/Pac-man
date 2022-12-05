'use strict'


var PACMAN
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        renderCell(gPacman.location, '⚰️')
        gameOver()
        return
    }
    if (nextCell === GHOST && gPacman.isSuper) {
        //////////////////////////////////////
        for (var i = 0; i < gGhosts.length; i++) {
            const ghost = gGhosts[i]
            if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
                gGhosts.splice(i, 1)
                // return
                setTimeout(() => {
                    gGhosts.push(ghost)
        
                }, 5000)
            }
        }
    }
    //////////////////////////////////////////////////
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false

        }, 5000)
    }

    if (nextCell === FOOD) {
        updateScore(1)
        
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    if (!isFoodLeft()) {
        document.querySelector('h2').innerText = 'VICTORY!!!'
        gameOver()
    }
    
}

function getNextLocation(eventKeyboard) {
    var elPacman = document.querySelector('.pacman')
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            // elPacman.style.transform = 'rotate(270deg)'
            console.log('elPacman:',elPacman)
            PACMAN = '<img class="pacman up" src="image/pacman.png">'
            nextLocation.i--
            console.log('here');

            break;
        case 'ArrowRight':
            // elPacman.style.transform = 'rotate(0)'
            PACMAN = '<img class="pacman right" src="image/pacman.png">'
            nextLocation.j++
            break;
        case 'ArrowDown':
            // elPacman.style.transform = 'rotate(90deg)'
            PACMAN = '<img class="pacman down" src="image/pacman.png">'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            // elPacman.style.transform = 'rotate(180deg)'
            PACMAN = '<img class="pacman left" src="image/pacman.png">'
            nextLocation.j--
            break;
    }
    return nextLocation
}

function isFoodLeft() {
    for (var i = 0; i < gBoard.length - 2; i++) {
        for (var j = 0; j < gBoard.length - 2; j++) {
            const currCell = gBoard[i + 1][j + 1]
            if (currCell === FOOD) {
                return true
            }
        }

    }
    return false
}