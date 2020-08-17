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
    switch (true) {
        case keys[39]: //right arrow
            character.moveRight()
            break;
        case keys[37]: //left arrow
            character.moveLeft()
            break;
        case keys[38]: //up arrow
            character.jump()
            break;
        case keys[32]: //spacebar
            character.jump()
            break;
    }
}

intervalId = setInterval(update, 1000 / 60)