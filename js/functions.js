function update() {
  frames++;
  clearCanvas();
  board.draw();
  character.gravity();
  checkKeys();
  character.draw();
  liveDrawer();
  if (frames % 120 === 0) {
    createEnemy();
  }
  drawEnemies();
}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function createEnemy() {
  let randomX = Math.floor(Math.random() * ($canvas.width - 80 - 30) + 30);
  enemies.push(new Enemy(randomX));
}

function drawEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.draw();
    if (collisionDetecter(enemy)) {
      enemies.splice(index, 1);
      character.lives--;
    }
    if (enemy.y > $canvas.height) {
      enemies.splice(index, 1);
    }
  });
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
