class Paddle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.width = 110;
      this.height = 10;
      this.x = (canvas.width - this.width) / 2;
      this.y = canvas.height - this.height;
      this.rightPressed = false;
      this.leftPressed = false;
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "green";
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    move() {
      if (this.rightPressed && this.x < this.canvas.width - this.width) {
        this.x += 7;
      } else if (this.leftPressed && this.x > 0) {
        this.x -= 7;
      }
    }
  }