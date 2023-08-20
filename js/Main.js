
class Main {
  constructor() {
    this.backgroundMusic = document.getElementById("background-music");
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas);
    this.paddle = new Paddle(this.canvas);
    // Initialize bricks and other variables
    this.brickRowCount = 7; 
    this.brickColumnCount = 5; 
    this.bricks = [];
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      this.brickColor = Math.floor(Math.random()*16777215).toString(16);
      for (let r = 0; r < this.brickRowCount; r++) {
        const brickX = r * (75 + 10) + 30;
        const brickY = c * (20 + 10) + 30;
        this.bricks[c][r] = new Brick(this.canvas, brickX, brickY, this.brickColor);
      }
    }
    this.lives = 3;
    this.score = 0;
    
    this.isGameStarted = false; // Thêm biến kiểm tra trạng thái game

    this.canvas.addEventListener(
      "keydown",
      this.keyDownHandler.bind(this),
      false
    );
    this.canvas.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    this.canvas.addEventListener(
      "mousemove",
      this.mouseMoveHandler.bind(this),
      false
    );
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
      if (!this.isGameStarted) {
        this.isGameStarted = true;
        document.getElementById("buttonContainer").style.display = "none";
        this.start();
      }
    });
    const settingsButton = document.getElementById("settingsButton");
    settingsButton.addEventListener("click", () => {
        document.getElementById("buttonContainer").style.display = "none";
        document.getElementById("buttonSetting").style.display = "flex";
    });
    const lowSetting = document.getElementById("lowSetting");
    lowSetting.addEventListener("click", () => {
      document.getElementById("buttonContainer").style.display = "flex";
      document.getElementById("buttonSetting").style.display = "none";
      this.ball.speed = 2;
      this.ball.dx = this.ball.speed
      this.ball.dy = -this.ball.speed
    });
    const mediumSetting = document.getElementById("mediumSetting");
    mediumSetting.addEventListener("click", () => {
      document.getElementById("buttonContainer").style.display = "flex";
      document.getElementById("buttonSetting").style.display = "none";
      this.ball.speed = 3.5;
      this.ball.dx = this.ball.speed
      this.ball.dy = -this.ball.speed
    });
    const hardSetting = document.getElementById("hardSetting");
    hardSetting.addEventListener("click", () => {
      document.getElementById("buttonContainer").style.display = "flex";
      document.getElementById("buttonSetting").style.display = "none";
      this.ball.speed = 5;
      this.ball.dx = this.ball.speed
      this.ball.dy = -this.ball.speed
    });
  }

  keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.paddle.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.paddle.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.paddle.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.paddle.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  collisionDetection() {
    // Xử lý va chạm với tường
    if (
      this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
      this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (
      this.ball.y + this.ball.dy >
      this.canvas.height - this.ball.radius
    ) {
      if (
        this.ball.x > this.paddle.x &&
        this.ball.x < this.paddle.x + this.paddle.width
      ) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives--;
        if (!this.lives) {
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = this.ball.speed;
          this.ball.dy = -this.ball.speed;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }

    // Xử lý va chạm với gạch
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + brick.width &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + brick.height
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.score++;
            this.ball.ballColor =  '#' + Math.floor(Math.random()*16777215).toString(16);
            this.ball.increaseSpeed(); // Gọi phương thức để tăng tốc độ
            if (this.score === this.brickRowCount * this.brickColumnCount) {
              alert("Congratulations! You win!");
              document.location.reload();
            }
          }
        }
      }
    }
  }
  initGame() {
    const backgroundImage = new Image();
    backgroundImage.src = "1.jpg";
    backgroundImage.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }
  drawBefore() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();
    this.paddle.draw();
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r].draw();
      }
    }
  }
  draw() {
    this.drawBefore();
    this.paddle.move();
    this.ball.update();
    this.collisionDetection();

    // Vẽ điểm số và số mạng còn lại
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 8, 20);
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);

    if (this.lives > 0) {
      requestAnimationFrame(this.draw.bind(this));
    } else {
      // Nếu số mạng bằng 0, hiển thị thông báo và tải lại trò chơi
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        "Game Over !!!",
        this.canvas.width / 2 - 70,
        this.canvas.height / 2
      );
      setTimeout(() => {
          document.location.reload();
      }, 5000); // Tải lại sau 2 giây
    }
  }

  start() {
    this.backgroundMusic.play();
    this.draw(); // Start the game loop
  }
}
const game = new Main();
game.initGame();
