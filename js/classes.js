// board class
class Board {
  constructor(width, height, imageSrc) {
    this.x = 0;
    this.y = 0;
    this.width = width; //1564
    this.height = height; //626
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => this.draw();
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y - 300, this.width, this.height);
  }
}

//class character
class Character {
  constructor(character) {
    this.name = character.name;
    this.lives = 3;
    this.height = 450 / 3;
    this.width = 624 / 6;
    this.x = 300;
    this.y = $canvas.height - this.height - 10;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.jumpStrength = 23;
    this.onPlatform = [];
    this.imageBody = new Image();
    this.imageBody.src = "../img/spriters/spriter3.png";
    this.imageFace = new Image();
    this.imageFace.src = character.img;
    this.animateX = 0;
    this.animateY = 0;
    this.imageMask = new Image();
    this.imageMask.src = "../img/objects/cubrebocas-puesto.png";
    this.hasMask = false;
    this.offsetX = character.offsetX;
    this.offsetY = character.offsetY;
    this.ratioWidth = character.ratioWidth;
    this.ratioHeight = character.ratioHeight;
    this.offsetMaskX = character.offsetMaskX;
    this.offsetMaskY = character.offsetMaskY;
    this.ratioMaskWidth = character.ratioMaskWidth;
    this.ratioMaskHeight = character.ratioMaskHeight;
  }
  draw() {
    if (this.y > $canvas.height - this.height - 10) {
      this.y = $canvas.height - this.height - 10;
      this.jumping = false;
    }
    ctx.drawImage(
      this.imageBody,
      this.width * this.animateX,
      this.height * this.animateY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      this.imageFace,
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.width * this.ratioWidth,
      this.height * this.ratioHeight
    );
    if (this.hasMask) {
      ctx.drawImage(
        this.imageMask,
        this.x + this.offsetMaskX,
        this.y + this.offsetMaskY,
        this.width * this.ratioMaskWidth,
        this.height * this.ratioMaskHeight
      );
    }
  }
  moveRight() {
    this.x += this.velX;
    this.velX++;
    this.velX *= friction;
    this.animateY = 0;
    if (frames % 5 === 0 && !this.jumping) {
      this.animateX++;
      if (this.animateX > 5) this.animateX = 0;
    }
    if (this.x > $canvas.width - this.width)
      this.x = $canvas.width - this.width;
  }
  moveLeft() {
    this.x -= this.velX;
    this.velX++;
    this.velX *= friction;
    this.animateY = 1;
    if (frames % 5 === 0 && !this.jumping) {
      this.animateX++;
      if (this.animateX > 5) this.animateX = 0;
    }
    if (this.x < 0) this.x = 0;
  }
  gravity() {
    this.y += this.velY;
    this.velY += gravity;
    if (this.y > $canvas.height - this.height - 10) {
      this.y = $canvas.height - this.height - 10;
      this.jumping = false;
      this.onPlatform.forEach((el) => (el = false));
    }
  }
  jump() {
    if (!this.jumping) {
      this.animateX = 0;
      this.velY = -this.jumpStrength;
      this.jumping = true;
    }
  }
}

//Obstacle class
class Enemy {
  constructor(randomX) {
    this.x = randomX;
    this.y = -10;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = "../img/objects/covid.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.y = this.y + 3;
  }
}

class FaceMask extends Enemy {
  constructor(randomX) {
    super(randomX);
    this.image.src = "../img/objects/cubrebocas.png";
    this.width = 80;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.y = this.y + 2;
  }
}
class Seringe {
  constructor(randomX, randomY) {
    this.x = randomX;
    this.y = randomY;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = "../img/objects/seringeDef.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Platform {
  constructor(randomX, randomY) {
    this.x = randomX;
    this.y = randomY;
    this.width = 160;
    this.height = 60;
    this.img = new Image();
    this.img.src = "../img/bg/brick-platform.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

//Win seringe

class WinSeringe {
  constructor() {
    this.seringePercentage = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.x = 30;
    this.y = 7;
    this.height = 70;
    this.width = 280;
    this.image = new Image();
    this.image.src = "../img/objects/jeringa.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    var gradient = ctx.createLinearGradient(10, 90, 200, 90);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;

    ctx.fillRect(
      this.x + 5,
      this.y + 26,
      (this.width - 100) * (this.seringePercentage.length / 10),
      this.height - 55
    );
  }
}
