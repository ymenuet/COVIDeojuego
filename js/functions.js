function update() {
    frames++;
    clearCanvas();
    board.draw();
    character.gravity();
    checkKeys();
    drawPlatforms();
    collisionPlatform();
    character.draw();
    liveDrawer();
    createEnemy();
    drawEnemies();
    createFaceMasks();
    drawFaceMasks();
}

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function createEnemy() {
    if (frames % 120 === 0) {
        let randomX = Math.floor(Math.random() * ($canvas.width - 80 - 30) + 30);
        enemies.push(new Enemy(randomX));
    }
}


function drawEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.draw();
        if (collisionDetecter(enemy)) {
            enemies.splice(index, 1);
            if (character.hasMask) {
                character.hasMask = false
            } else character.lives--;
        }
        if (enemy.y > $canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function createFaceMasks() {
    if (frames % 1000 === 0) {
        let randomX = Math.floor(Math.random() * ($canvas.width - 80 - 30) + 30);
        faceMasks.push(new FaceMask(randomX));
    }
}

function drawFaceMasks() {
    faceMasks.forEach((faceMask, index) => {
        faceMask.draw();
        if (collisionDetecter(faceMask)) {
            faceMasks.splice(index, 1);
            character.hasMask = true;
        }
        if (faceMask.y > $canvas.height) {
            faceMasks.splice(index, 1);
        }
    });
}

function drawPlatforms() {
    platforms.forEach(platform => platform.draw())
}

function checkKeys() {
    if (keys[39]) {
        character.moveRight();
    }
    if (keys[37]) {
        character.moveLeft();
    }
    if (keys[38] || keys[32]) {
        character.jump();
    }
}

function collisionDetecter(obstacle) {
    return (
        character.y < obstacle.y + obstacle.height &&
        character.y + character.height > obstacle.y &&
        character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x
    );
}

function collisionPlatform() {
    platforms.forEach((platform, index) => {
        if (
            character.y < platform.y + platform.height - 20 &&
            character.y + character.height + 20 > platform.y &&
            character.x < platform.x + platform.width - 40 &&
            character.x + character.width - 40 > platform.x &&
            character.velY > 0 &&
            (character.jumping || character.onPlatform[index])
        ) {
            character.y = platform.y - character.height + 20;
            character.jumping = false;
            character.onPlatform.forEach(el => {
                el = false
            })
            character.onPlatform[index] = true
        }
    })
}

function liveDrawer() {
    const heartImg = new Image();
    heartImg.src = "../img/objects/heart.png";

    if (character.lives === 3) {
        ctx.drawImage(heartImg, 30, 50, 50, 50);
        ctx.drawImage(heartImg, 30, 110, 50, 50);
        ctx.drawImage(heartImg, 30, 170, 50, 50);
    }
    if (character.lives === 2) {
        ctx.drawImage(heartImg, 30, 110, 50, 50);
        ctx.drawImage(heartImg, 30, 170, 50, 50);
    }
    if (character.lives === 1) {
        ctx.drawImage(heartImg, 30, 170, 50, 50);
    }
}

intervalId = setInterval(update, 1000 / 60);