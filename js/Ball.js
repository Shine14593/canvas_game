class Ball {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.radius = 10;
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.speed = 2;
    this.dx = 2;
    this.dy = -2;
    this.ballColor = "#0095DD"; // Thêm biến lưu màu bóng
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle =this.ballColor;
    this.ctx.fill();
    this.ctx.closePath();
  }   

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  // Thêm phương thức để tăng tốc độ bóng
  increaseSpeed() {
    if (this.dx > 0) {
      this.dx += 0.3;
    } else {
      this.dx -= 0.3;
    }

    if (this.dy > 0) {
      this.dy += 0.3;
    } else {
      this.dy -= 0.3;
    }
  }
}