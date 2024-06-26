let allCourses = [];
async function getAllCourses() {
    try {
        // 使用 fetch API 加载本地 JSON 文件
        const response = await fetch('JSON/classdata.json');
        // 确保响应成功
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        // 将响应解析为 JSON
        const data = await response.json();
        
        // 遍历 classes 数组中的所有课程
        allCourses = data.classes;
    } catch (error) {
        // 处理错误
        console.error('获取课程信息时出错:', error);
    }
}

let chosenNum = localStorage.getItem("chosenNum");
let courses = [];
let chosenCourses = [];
for (let i = 0; i < chosenNum; i++) {
    let course = localStorage.getItem("chosenCourse" + i);
    courses.push(course);
}
for (let i = 0; i < chosenNum; i++) {
    for (let j = 0; j < allCourses.length; j++) {
        if (courses[i] === allCourses[j].name) {
            chosenCourses.push(allCourses[j]);
            break;
        }
    }
}

function P(e, num0, num1, x) {
    return e * Math.pow((1 - num0 / (num1 + x)), 0.55 * x + 0.5) 
            * Math.pow(num1 / (num1 - num0), 0.5 - 0.45 * x);
}

document.addEventListener("DOMContentLoaded", function () {
    const check = document.querySelector("#check");
    check.addEventListener("click", function () {
        let need = [];
        let pending = [];
        let maxp = [];
        let heart = [];
        let poss = [];
        let per = [];
        let mean = [];
        let X = [];
        let m = 99;
        let length = 15;
        let p0 = -347.8;
        let p1 = 392.6;
        let p2 = -101;
        let reg1 = /^\d+$/     //自然数
        for (let i = 0; i < chosenNum; i++) {
            let p = document.getElementById("pending" + i).value;
            let m = document.getElementById("max" + i).value;
            let h = document.getElementById("slider" + i).value + 1;
            // 检查p, m是否为正整数
            if (p === "" || m === "" || h === "") {
                customElements.get('s-snackbar').show({text: '没有填写完整信息！',
                                                       action: '关闭'});
                return;
            }
            if (!reg1.test(p) || !reg1.test(m)) {
                customElements.get('s-snackbar').show({text: '请填写正整数！',
                                                       action: '关闭'});
                return;
            }
            p = parseInt(p);
            m = parseInt(m);
            pending.push(p);
            maxp.push(m);
            heart.push(h);
            poss.push(0);
            X.push(0);
            if (p > m) {
                need.push(i);
            }
        }
        if (need.length == 0){
            let result = '';
            for (let i = 0; i < chosenNum; i++) {
                result += courses[i] + '：'
                let temp = length - courses[i].length;
                while (temp--) {
                    result += '\u3000';
                }
                result += X[i] + '\n';
            }
            customElements.get('s-dialog').show({
                headline: '推荐投点',
                text: result,
                actions: [{
                    text: '确定',
                }]
            });
        }
        for (let j = 0; j < need.length; j++) {
            let i = need[j];
            per[i] = pending[i] / maxp[i];
            per[i] = Math.pow(per[i] - 1,0.125) + 1;
            mean[i] = p2 * Math.pow(per[i], 2) + p1 * per[i] + p0 + 0.5;
            mean[i] = 0.92 * mean[i] + 0.08 * 99.5;
        }
        let a = 0;
        let leng = need.length;
        let i = 0;
        let j = 0;
        X[need[0]] = 99;
        for (i = 0; i < leng; i++) {
            if (X[need[(a + i) % leng]] == 0) {
                continue;
            }
            for (j = 1; j < leng; j++) {
                if (P(heart[need[(a+i)%leng]],maxp[need[(a+i)%leng]],pending[need[(a+i)%leng]],(X[need[(a+i)%leng]]+0.5)/mean[need[(a+i)%leng]])
                    + P(heart[need[(a+i+j)%leng]],maxp[need[(a+i+j)%leng]],pending[need[(a+i+j)%leng]],(X[need[(a+i+j)%leng]]+0.5)/mean[need[(a+i+j)%leng]]) 
                    >P(heart[need[(a+i)%leng]],maxp[need[(a+i)%leng]],pending[need[(a+i)%leng]],(X[need[(a+i)%leng]]-0.5)/mean[need[(a+i)%leng]])
                    + P(heart[need[(a+i+j)%leng]],maxp[need[(a+i+j)%leng]],pending[need[(a+i+j)%leng]],(X[need[(a+i+j)%leng]]+1.5)/mean[need[(a+i+j)%leng]]))
                {
                    X[need[(a+i)%leng]]=X[need[(a+i)%leng]]-1
                    X[need[(a+i+j)%leng]]=X[need[(a+i+j)%leng]]+1
                    a=(a+i+j)%leng
                    i=0
                    j=1
                }
            }
        }
        let result = '';
        for (let i = 0; i < chosenNum; i++) {
            result += courses[i] + '：'
            let temp = length - courses[i].length;
            while (temp--) {
                result += '\u3000';
            }
            result += Math.round(X[i]) + '\n';
        }
        customElements.get('s-dialog').show({
            headline: '推荐投点',
            text: result,
            actions: [{
                text: '确定',
            }]
        });
    });
});



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
const ballImages = ["../images/blue.png", "../images/red.png", "../images/green.png"]
function initCanvas() {
    ctx.clearRect(0, 0, window.innerWidth,window.innerHeight);
    ctx.fillStyle = 'rgba(6,89,200,0.77)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  }


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
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

Ball.prototype.draw = function (classnum) {
    let img = new Image();
    img.src = ballImages[this.color];
    ctx.drawImage(img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);

    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // 如果字数在五个字以内，一行，否则两行
    if (courses[classnum].length <= 5) {
        ctx.fillText(courses[classnum], this.x, this.y + 16);
    } else {
        ctx.fillText(courses[classnum].slice(0, 5), this.x, this.y);
        ctx.fillText(courses[classnum].slice(5), this.x, this.y + 32);
    }
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
    Ball.prototype.collisionDetect = function () {
        for (let j = 0; j < balls.length; j++) {
            if (this !== balls[j]) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + balls[j].size) {
                    // 计算碰撞后的速度
                    const angle = Math.atan2(dy, dx);
                    const speed1 = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
                    const speed2 = Math.sqrt(balls[j].velX * balls[j].velX + balls[j].velY * balls[j].velY);
                    const direction1 = Math.atan2(this.velY, this.velX);
                    const direction2 = Math.atan2(balls[j].velY, balls[j].velX);
    
                    const newVelX1 = speed1 * Math.cos(direction1 - angle);
                    const newVelY1 = speed1 * Math.sin(direction1 - angle);
                    const newVelX2 = speed2 * Math.cos(direction2 - angle);
                    const newVelY2 = speed2 * Math.sin(direction2 - angle);
    
                    const finalVelX1 = ((this.size - balls[j].size) * newVelX1 + (balls[j].size + balls[j].size) * newVelX2) / (this.size + balls[j].size);
                    const finalVelX2 = ((this.size + this.size) * newVelX1 + (balls[j].size - this.size) * newVelX2) / (this.size + balls[j].size);
                    const finalVelY1 = newVelY1;
                    const finalVelY2 = newVelY2;
    
                    this.velX = Math.cos(angle) * finalVelX1 + Math.cos(angle + Math.PI / 2) * finalVelY1;
                    this.velY = Math.sin(angle) * finalVelX1 + Math.sin(angle + Math.PI / 2) * finalVelY1;
                    balls[j].velX = Math.cos(angle) * finalVelX2 + Math.cos(angle + Math.PI / 2) * finalVelY2;
                    balls[j].velY = Math.sin(angle) * finalVelX2 + Math.sin(angle + Math.PI / 2) * finalVelY2;
    
                    // 确保球体分开，不再重叠
                    const overlap = 0.5 * (this.size + balls[j].size - distance + 1);
                    this.x += overlap * (this.x - balls[j].x) / distance;
                    this.y += overlap * (this.y - balls[j].y) / distance;
                    balls[j].x -= overlap * (this.x - balls[j].x) / distance;
                    balls[j].y -= overlap * (this.y - balls[j].y) / distance;
                }
            }
        }
    };
    
};

let balls = [];
let maxnum = chosenNum;
while (balls.length < maxnum) {
    const size = 90;
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
        random(0, 3),
        size,
    );
    balls.push(ball);

}

function loop() {
    initCanvas();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw(i);
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}
loop();

const myCourses = document.querySelector("#myCourses");
for (let i = 0; i < chosenNum; i++) {
    myCourses.innerHTML += `
    <s-card clickable="true">
    <div slot="subhead" class="courses">${courses[i]}</div>
        <div slot="text">
            <div class="row" id="classs">
                <div class="col">
                    <s-text-field label="已选人数">
                        <textarea rows="1" cols="5" id="pending${i}"></textarea>
                    </s-text-field>
                </div>
                <div class="col">
                    <s-text-field label="限选人数">
                        <textarea rows="1" cols="5" id="max${i}"></textarea>
                    </s-text-field>
                </div>
            </div>
        </div>
        <div slot="text" id="heart">
            <span id="hearth">心动值</span>
            <s-slider style="color: #DF5656" id="slider${i}" value="0" min="0" max="10" step="1" labeled="true"></s-slider>
        </div>
    </s-card>
    `
}

for (let i = 0; i < chosenNum; i++) {
    let rate = document.getElementById("rate" + i);
    let slider = document.getElementById("slider" + i);
    slider.addEventListener("change", function () {
        let ball = balls[i];
        ball.size = 8 * slider.value + 90;
    });
    
}

