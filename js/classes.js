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
    constructor(character) {
        this.name = character.name;
        this.height = 450 / 3;
        this.width = 624 / 6;
        this.x = 300;
        this.y = $canvas.height - this.height - 10;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.jumpStrength = 20;
        this.imageBody = new Image();
        this.imageBody.src = "../img/spriters/spriter3.png";
        this.imageFace = new Image();
        this.imageFace.src = character.img;
        this.animateX = 0;
        this.animateY = 0;
        this.imageMask = new Image();
        this.imageMask.src = '../img/objects/cubrebocas-puesto.png';
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