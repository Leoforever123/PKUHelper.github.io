
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
const courses =["JS", "数值分析","数据结构","计算机网络","操作系统","数据库","编译原理", "体系"];
function initCanvas() {
    ctx.clearRect(0, 0, window.innerWidth,window.innerHeight);
    ctx.fillStyle = 'rgba(6,89,200,0.77)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  }


function random(min, max) {
const num = Math.floor(Math.random() * (max - min)) + min;
return num;
}

function randomColor() {
const color =
    "rgb(" +
    random(0, 255) +
    "," +
    random(0, 255) +
    "," +
    random(0, 255) +
    ",0.5)";
return color;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.justCollided = false;
    this.clideWith = -1;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = "32px Arial";
    let color = this.color;
    let r = parseInt(color.slice(4, 7));
    let g = parseInt(color.slice(9, 12));
    let b = parseInt(color.slice(14, 17));
    let brightness = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    if (brightness > 127.5) {
        ctx.fillStyle = "black";
    } else {
        ctx.fillStyle = "white";
    }
    ctx.textAlign = "center";
    ctx.fillText(courses[this.size % 8], this.x, this.y + 15);
};

Ball.prototype.update = function () {
    if (this.x + this.size >= width) {
        this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
    if (this.justCollided) {
        let j = this.clideWith;
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= this.size + balls[j].size) {
            this.justCollided = false;
        }
    }

    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                if (!this.justCollided) {
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                    this.justCollided = true;
                    this.clideWith = j;
                }
            }
        }
    }
};

let balls = [];
let maxnum = 8;
while (balls.length < maxnum) {
const size = random(80, 100);
let vx = random(-5, 5);
let vy = random(-5, 5);
while (vx === 0 || vy === 0) {
    vx = random(-2, 2);
    vy = random(-2, 2);
}
let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    vx,
    vy,
    randomColor(),
    size,
);
balls.push(ball);
}

function loop() {
    initCanvas();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}
loop();