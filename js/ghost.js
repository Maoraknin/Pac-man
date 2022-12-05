'use strict'







var GHOST = '<img class="ghost" src="image/3.png">'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
        var ghost = gGhosts[i]
        board[ghost.location.i][ghost.location.j] = GHOST
    }
    window.ghosts = gGhosts
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    return ghost
    
}

function moveGhosts() {
    
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        renderCell(gPacman.location, '⚰️')
        gameOver()
        return
    }
    if (nextCell === PACMAN && gPacman.isSuper) {
        //////////////////////////////////////
        return
        for(var i = 0; i < gGhosts.length; i++){
            const ghost = gGhosts[i]
            if(ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j ){
                gGhosts.splice(i,1)
                // nextCell = PACMAN
                gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
                renderCell(ghost.location, ghost.currCellContent)
                // renderCell(nextLocation, getGhostHTML(PACMAN))
                return
                
            }
        }
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if(gPacman.isSuper) GHOST = '<img class="ghost" src="image/edible-ghost.png">'
    else GHOST = '<img class="ghost" src="image/3.png">'
    return `<span>${GHOST}</span>`
}