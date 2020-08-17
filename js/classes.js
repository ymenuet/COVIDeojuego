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
    this.x--;
    if (this.x < -this.width) {
      this.x = 0;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
