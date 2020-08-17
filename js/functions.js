function update() {
    frames++;
    clearCanvas()
    board.draw()
    character.gravity()
    checkKeys()
    character.draw()
}

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

function checkKeys() {
    if (keys[39]) {
        character.moveRight()
    }
    if (keys[37]) {
        character.moveLeft()
    }
    if (keys[38] || keys[32]) {
        character.jump()
    }
}

intervalId = setInterval(update, 1000 / 60)