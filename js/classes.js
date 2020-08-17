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
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

//class character

//AMLO OFFSETS  this.xFace = this.x + 30;  this.yFace = this.y - 30;    this.widthFace = this.width / 2;     this.heightFace = this.height / 2;

class Character {
  constructor(name, imageFaceSrc) {
    this.name = name;
    this.height = 450 / 3;
    this.width = 624 / 6;
    this.widthFace = this.width / 2;
    this.heightFace = this.height / 2;
    this.x = 300;
    this.y = $canvas.height - this.height - 10;
    this.xFace = this.x + 30;
    this.yFace = this.y - 30;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.jumpStrength = 10;
    this.imageBody = new Image();
    this.imageFace = new Image();
    this.imageBody.src = "../img/spriters/spriter3.png";
    this.imageFace.src = imageFaceSrc;
    this.animateX = 0;
    this.animateY = 0;
    this.imageBody.onload = () => this.draw();
  }
  draw() {
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
      this.xFace,
      this.yFace,
      this.widthFace,
      this.heightFace
    );
  }
  moveRight() {
    this.x += this.velX;
    this.velX *= friction;
  }
  moveLeft() {
    this.x -= this.velX;
    this.velX *= friction;
  }
  gravity() {
    this.y += this.velY;
    this.velY += gravity;
    if (this.y > $canvas.height - this.height - 10) {
      this.y = $canvas.height - this.height - 10;
      this.jumping = false;
    }
  }
  jump() {
    if (!this.jumping) {
      this.velY = -this.jumpStrength;
      this.jumping = true;
    }
  }
}
