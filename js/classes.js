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

//AMLO OFFSETS  this.xFace = this.x + 19;  this.yFace = this.y - 30;    this.widthFace = this.width / 2 + 15;     this.heightFace = this.height / 2 + 15;

class Character {
    constructor(name, imageFaceSrc) {
        this.name = name;
        this.height = 450 / 3;
        this.width = 624 / 6;
        this.widthFace = this.width / 2 + 15;
        this.heightFace = this.height / 2 + 15;
        this.x = 300;
        this.y = $canvas.height - this.height - 10;
        this.xFace = this.x + 19;
        this.yFace = this.y - 30;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.jumpStrength = 20;
        this.imageBody = new Image();
        this.imageFace = new Image();
        this.imageBody.src = "../img/spriters/spriter3.png";
        this.imageFace.src = imageFaceSrc;
        this.animateX = 0;
        this.animateY = 0;
        this.imageMask = new Image()
        this.imageMask.src = '../img/objects/cubrebocas-puesto.png'
        this.hasMask = false
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
            this.x + 19,
            this.y - 30,
            this.width / 2 + 15,
            this.height / 2 + 15
        );
        if (this.hasMask) {
            ctx.drawImage(
                this.imageMask,
                this.x + 22,
                this.y + 11,
                this.width / 2 + 15,
                this.height / 3
            )
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
            this.animateX = 0
            this.velY = -this.jumpStrength;
            this.jumping = true;
        }
    }
}