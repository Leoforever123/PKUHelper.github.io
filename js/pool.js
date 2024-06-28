document.addEventListener('DOMContentLoaded', () => {
    const type = localStorage.getItem("background");
    if (type === null) {
        document.querySelector('body').style.backgroundImage = "url('../images/background1.jpg')";
    } else if (type === "Zelda") {
        document.querySelector('body').style.backgroundImage = "url('../images/background1.jpg')";
    } else if (type === "paper") {
        document.querySelector('body').style.backgroundImage = "url('../images/background2.png')";
    } else if (type === "red") {
        document.querySelector('body').style.backgroundImage = "url('../images/background3.jpg')";
    } else {
        document.querySelector('body').style.backgroundImage = type;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Zelda').addEventListener('click', () => {
        document.querySelector('body').style.backgroundImage = "url('../images/background1.jpg')";
        localStorage.setItem("background", "Zelda");
    });
    document.getElementById('paper').addEventListener('click', () => {
        document.querySelector('body').style.backgroundImage = "url('../images/background2.png')";
        localStorage.setItem("background", "paper");
    });
    document.getElementById('red').addEventListener('click', () => {
        document.querySelector('body').style.backgroundImage = "url('../images/background3.jpg')";
        localStorage.setItem("background", "red");
    });
    document.getElementById('DIY').addEventListener('click', () => {
      // 创建一个隐藏的文件输入元素
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
  
      // 监听文件输入元素的变化事件
      fileInput.addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                  document.body.style.backgroundImage = `url(${e.target.result})`;
                  localStorage.setItem("background", document.body.style.backgroundImage);
              };
              reader.readAsDataURL(file);
          }
      });
  
      // 触发文件输入元素的点击事件
      fileInput.click();

    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('instruction').addEventListener('click', () => {
      let result = `
            在你的课塘中，你可以看到所有你选择的课程，
        同时提供投点推荐功能，帮助你更好地选择投点。你
        需要填写所有非推荐课程的已选人数和限选人数以及
        心动值，并且确保你的选课表中没有冲突选课，然后
        点击推荐投点按钮，即可得到推荐的投点方案。

            同时，设置心动值可以调整课程球的大小，一起
        来养课程球吧！

        本项目由王骏达完成，如有问题请联系邮箱：
        leoforever823@gmail.com
      `;
      customElements.get('s-dialog').show({
        headline: '使用说明',
        text: result,
        actions: [{
            text: '关闭',
        }]
      });
    });
  });

let allCourses = [];
let chosenNum = localStorage.getItem("chosenNum");
let courses = [];
let chosenCourses = [];
let nonrecommend = [];
let totalsum;
for (let i = 0; i < chosenNum; i++) {
    let course = localStorage.getItem("chosenCourse" + i);
    courses.push(course);
}

async function getAllCourses() {
    try {
        // 使用 fetch API 加载本地 JSON 文件
        const response = await fetch('../JSON/classdata.json');
        // 确保响应成功
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        // 将响应解析为 JSON
        const data = await response.json();
        
        // 遍历 classes 数组中的所有课程
        allCourses = data.classes;
        for (let i = 0; i < chosenNum; i++) {
            for (let j = 0; j < allCourses.length; j++) {
                if (courses[i] === allCourses[j].name) {
                    chosenCourses.push(allCourses[j]);
                    nonrecommend.push([allCourses[j], i]);
                    break;
                }
            }
        } 
        totalsum = nonrecommend.length;
        addClasses();
        addEvent();
    } catch (error) {
        // 处理错误
        console.error('获取课程信息时出错:', error);
    }
}

getAllCourses();



function P(e, num0, num1, x) {
    return e * Math.pow((1 - num0 / (num1 + x)), 0.55 * x + 0.5) 
            * Math.pow(num1 / (num1 - num0), 0.5 - 0.45 * x);
}

document.addEventListener("DOMContentLoaded", function () {
    console.log(nonrecommend);
    const check = document.querySelector("#check");
    check.addEventListener("click", function () {
        if (nonrecommend.length === 0) {
            customElements.get('s-dialog').show({
                headline: '推荐投点',
                text: '没有需要计算的课程！',
                actions: [{
                    text: '确定',
                }]
            });
            return;
        }
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
        const has_conflict = localStorage.getItem("conflict");
        if (has_conflict === "true") {
            customElements.get('s-snackbar').show({text: '选课表中有冲突选课！',
                                                    action: '关闭'});
            return;
        }
        for (let i = 0; i < totalsum; i++) {
            let p = document.getElementById("pending" + nonrecommend[i][1]).value;
            let m = document.getElementById("max" + nonrecommend[i][1]).value;
            let h = document.getElementById("slider" + nonrecommend[i][1]).value + 1;
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
        console.log(need);
        console.log(pending);

        if (need.length == 0){
            let result = '';
            for (let i = 0; i < totalsum; i++) {
                result += courses[nonrecommend[i][1]] + '：'
                let temp = length - courses[nonrecommend[i][1]].length;
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
            return;
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
        for (let i = 0; i < totalsum; i++) {
            result += courses[nonrecommend[i][1]] + '：'
            let temp = length - courses[nonrecommend[i][1]].length;
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
let opacity = 0.2;
function initCanvas() {
    ctx.clearRect(0, 0, window.innerWidth,window.innerHeight);
    ctx.fillStyle = 'rgba(60,140,232,' + opacity + ')'; // 设置填充颜色
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
        this.x = width - this.size;
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX;
        this.x = this.size;
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY;
        this.y = height - this.size;
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY;
        this.y = this.size;
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

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw(i);
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}
loop();
function addClasses() {
    const myCourses = document.querySelector("#myCourses");
    for (let i = 0; i < chosenNum; i++) {
        myCourses.innerHTML += `
        <s-card id="card${i}">
        <div slot="subhead" class="courses" style="display:inline;">${courses[i]}</div>
        <s-button slot="subhead" id="check${i}" style="display:inline; float:right; " class="false">推荐</s-button>
        </s-card>
        `;
        let card = myCourses.querySelector("#card" + i);
        const div1 = document.createElement("div");
        div1.innerHTML = `
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
        `
        div1.setAttribute("slot", "text");
        card.appendChild(div1);
        const div2 = document.createElement("div");
        div2.innerHTML = `
            <span id="hearth">心动值</span>
            <s-slider style="color: #DF5656" id="slider${i}" value="0" min="0" max="10" step="1" labeled="true"></s-slider>
        `
        div2.setAttribute("slot", "text");
        div2.setAttribute("id", "heart");
        card.appendChild(div2);

    }
    for (let i = 0; i < chosenNum; i++) {
        let check = document.getElementById("check" + i);
        check.addEventListener("click", function () {
            console.log(check.classList)
            if (check.classList.contains("false")) {
                let card = document.getElementById("card" + i);
                // 删除倒数第二个后代
                card.removeChild(card.lastChild.previousElementSibling);
                check.classList.remove("false");
                check.classList.add("true");
                for (let j = 0; j < nonrecommend.length; j++) {
                    if (nonrecommend[j][1] === i) {
                        nonrecommend.splice(j, 1);
                        break;
                    }
                }
                totalsum = nonrecommend.length;
            } else if(check.classList.contains("true")) {
                let card = document.getElementById("card" + i);
                const div1 = document.createElement("div");
                div1.innerHTML = `
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
                `
                div1.setAttribute("slot", "text");
                // 在倒数第二个后代后插入div1
                card.insertBefore(div1, card.lastChild);
                check.classList.remove("true");
                check.classList.add("false"); 
                for (let j = 0; j < chosenNum; j++) {
                    if (chosenCourses[j].name === courses[i]) {
                        nonrecommend.push([chosenCourses[j], i]);
                        break;
                    }
                }    
                // 按i排序
                nonrecommend.sort(function(a, b) {
                    return a[1] - b[1];
                });
                totalsum = nonrecommend.length;   
            }
        });
    }
}

function addEvent() {
    for (let i = 0; i < chosenNum; i++) {
        if (chosenCourses[i].recommand === "true") {
            continue;
        }
        let slider = document.getElementById("slider" + i);
        slider.addEventListener("change", function () {
            console.log(slider.value);
            let ball = balls[i];
            ball.size = 8 * slider.value + 90;
        });
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('opacity').addEventListener('change', () => {
        const nowopacity = document.getElementById('opacity').value;
        opacity = nowopacity / 100;
    });
});

