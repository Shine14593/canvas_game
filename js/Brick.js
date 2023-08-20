class Brick {
    constructor(canvas, x, y, brickColor) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.width = 75;
      this.height = 20;
      this.x = x;
      this.y = y;
      this.status = 1;
      this.brickColor = brickColor;
    }
  
    draw() {
      if (this.status === 1) {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle ='#'+ this.brickColor;
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
  }