function update() {
    frames++;
    clearCanvas();
    board.draw();
    winSeringe.draw();
    character.gravity();
    checkKeys();
    drawPlatforms();
    collisionPlatform();
    printLevel();
    liveDrawer();
    createEnemy();
    drawEnemies();
    collisionEnemy();
    createFaceMasks();
    drawFaceMasks();
    createSeringe();
    drawSeringe();
    collisionSeringe();
    passLevel();
    character.draw();
    winner();
    gameOver();
}

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function createEnemy() {
    if (frames % Math.floor(200 / currentLevel) === 0) {
        let randomX = Math.floor(Math.random() * ($canvas.width - 80 - 30) + 30);
        enemies.push(new Enemy(randomX));
    }
}

function drawEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.draw();
        if (enemy.y > $canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function collisionEnemy() {
    enemies.forEach((enemy, index) => {
        if (collisionDetecter(enemy)) {
            enemies.splice(index, 1);
            if (character.hasMask) {
                character.hasMask = false;
            } else {
                character.changeTransparency();
                character.lives--;
            }
        }
    });
}

function createFaceMasks() {
    if (frames % (1000 * currentLevel / 2) === 0) {
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
    platforms.forEach((platform) => platform.draw());
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
            character.onPlatform.forEach((el) => {
                el = false;
            });
            character.onPlatform[index] = true;
        }
    });
}

function liveDrawer() {
    const heartImg = new Image();
    heartImg.src = "../img/objects/heart.png";

    if (character.lives === 3) {
        ctx.drawImage(heartImg, 30, 80, 50, 50);
        ctx.drawImage(heartImg, 30, 140, 50, 50);
        ctx.drawImage(heartImg, 30, 200, 50, 50);
    }
    if (character.lives === 2) {
        ctx.drawImage(heartImg, 30, 140, 50, 50);
        ctx.drawImage(heartImg, 30, 200, 50, 50);
    }
    if (character.lives === 1) {
        ctx.drawImage(heartImg, 30, 200, 50, 50);
    }
}

//Seringes

function createSeringe() {
    if (frames % seringeApparition === 0 && seringes.length < 3) {
        const maxX = $canvas.width - 50;
        const minX = 20;
        const maxY = $canvas.height - 340;
        const minY = 40;
        const maxTime = 900;
        const minTime = 400;
        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);
        seringes.push(new Seringe(randomX, randomY));
        seringeApparition = Math.floor(Math.random() * (maxTime - minTime) + minTime);
    }
}

function drawSeringe() {
    seringes.forEach((seringe, index) => {
        seringe.draw();
        if (seringe.time > 300) {
            removeSeringe(index);
        }
    });
}

function collisionSeringe() {
    seringes.forEach((seringe, index) => {
        if (collisionDetecter(seringe)) {
            winSeringe.seringePercentage.push(1);
            removeSeringe(index);
        }
    });
}

function removeSeringe(index) {
    seringes.splice(index, 1);
}

function printLevel() {
    ctx.font = '40px "Covered By Your Grace"'
    ctx.fillStyle = 'white';
    ctx.fillText(`Current level: ${currentLevel}/5`, 730, 50)
}

function winner() {
    if (winSeringe.seringePercentage.length > 9 && currentLevel >= 5) {
        setTimeout(() => {
            clearInterval(intervalId);
            ctx.fillStyle = "rgb(251, 192, 45)";
            ctx.globalAlpha = 0.1;
            ctx.beginPath();
            ctx.moveTo(210, 100);
            ctx.lineTo(790, 100);
            ctx.arc(780, 120, 20, Math.PI / 2, 0);
            ctx.lineTo(800, 490);
            ctx.arc(780, 480, 20, 0, Math.PI / 2);
            ctx.lineTo(210, 500);
            ctx.arc(220, 480, 20, -Math.PI / 2, -Math.PI);
            ctx.lineTo(200, 110);
            ctx.arc(220, 120, 20, Math.PI, Math.PI / 2);
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
            ctx.font = '70px "Covered By Your Grace"';
            ctx.fillStyle = "white";
            ctx.fillText("YOU WIN!", 250, 200);
            ctx.font = '40px "Covered By Your Grace"';
            ctx.fillText(`${character.name}`, 250, 270);
            ctx.fillText(`tried to save the world...`, 250, 320);
            ctx.fillText(`AND ${character.gender.toUpperCase()} DID IT!!!`, 250, 370);
            ctx.fillText(`Humanity wins,`, 250, 420);
            ctx.fillText(`COVID-19 loses...`, 250, 470);
            $pauseButton.style.display = 'none'
            $restartButton.style.display = 'block'
        }, 1000 / 3);
    }
}

function passLevel() {
    if (winSeringe.seringePercentage.length > 9 && currentLevel < 5) {
        setTimeout(() => {
            clearInterval(intervalId);
            ctx.fillStyle = "rgb(46, 125, 50)";
            ctx.globalAlpha = 0.1;
            ctx.beginPath();
            ctx.moveTo(210, 100);
            ctx.lineTo(790, 100);
            ctx.arc(780, 120, 20, Math.PI / 2, 0);
            ctx.lineTo(800, 490);
            ctx.arc(780, 480, 20, 0, Math.PI / 2);
            ctx.lineTo(210, 500);
            ctx.arc(220, 480, 20, -Math.PI / 2, -Math.PI);
            ctx.lineTo(200, 110);
            ctx.arc(220, 120, 20, Math.PI, Math.PI / 2);
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
            ctx.font = '70px "Covered By Your Grace"';
            ctx.fillStyle = "white";
            ctx.fillText("Level Completed!", 250, 200);
            ctx.font = '40px "Covered By Your Grace"';
            ctx.fillText(`${character.name}`, 250, 270);
            ctx.fillText(`is trying to save the world...`, 250, 320);
            ctx.fillText(
                `AND IT IS WORKING!`,
                250,
                370
            );
            ctx.fillText(`COVID-19 loses...`, 250, 420);
            ctx.fillText(`But there is still work to be done...`, 250, 470);
            $pauseButton.style.display = 'none'
            $nextButton.style.display = 'block'
        }, 1000 / 3);
    }
}

function gameOver() {
    if (character.lives < 1) {
        setTimeout(() => {
            clearInterval(intervalId);
            ctx.fillStyle = "rgb(183, 28, 28)";
            ctx.globalAlpha = 0.1;
            ctx.beginPath();
            ctx.moveTo(210, 100);
            ctx.lineTo(790, 100);
            ctx.arc(780, 120, 20, Math.PI / 2, 0);
            ctx.lineTo(800, 490);
            ctx.arc(780, 480, 20, 0, Math.PI / 2);
            ctx.lineTo(210, 500);
            ctx.arc(220, 480, 20, -Math.PI / 2, -Math.PI);
            ctx.lineTo(200, 110);
            ctx.arc(220, 120, 20, Math.PI, Math.PI / 2);
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
            ctx.font = '100px "Covered By Your Grace"';
            ctx.fillStyle = "white";
            ctx.fillText("Game Over", 300, 200);
            ctx.font = '40px "Covered By Your Grace"';
            ctx.fillText(`${character.name}`, 250, 270);
            ctx.fillText(`tried to save the world.`, 250, 320);
            ctx.fillText(`But ${character.gender} died,`, 250, 370);
            ctx.fillText(`and humanity as well.`, 250, 420);
            ctx.fillText(`COVID-19 wins...`, 250, 470);
            $pauseButton.style.display = 'none'
            $restartButton.style.display = 'block'
        }, 1000 / 3);
    }
}

function setCharacter(chosenCharacter) {
    character = new Character(chosenCharacter);
}

function addLevel() {
    currentLevel++;
    character.lives = 3;
    character.x = 300;
    character.y = 200;
    frames = 0;
    keys = [];
    enemies = [];
    faceMasks = [];
    seringes = [];
    seringeApparition = 500
    winSeringe.seringePercentage.splice(0, winSeringe.seringePercentage.length);
    startGame();
}

function startGame() {
    intervalId = setInterval(update, 1000 / 60);
    $restartButton.style.display = 'none'
    $nextButton.style.display = 'none'
    $pauseButton.style.display = 'block'
}

function pauseGame() {
    clearInterval(intervalId);
    ctx.font = `80px 'Covered By Your Grace`
    ctx.fillStyle = 'white';
    ctx.fillText('GAME PAUSED', 300, 350)
}