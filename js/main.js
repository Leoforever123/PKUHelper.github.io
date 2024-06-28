/**********课程搜索栏的实现************/
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input', filterCourses);
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('click', filterCourses);
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          filterCourses();
      }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('deleteInput').addEventListener('click', () => {
      document.getElementById('searchInput').value = '';
      filterCourses();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('opacity').addEventListener('change', () => {
      const opacity = document.getElementById('opacity').value;
      document.getElementById('classsheet').style.opacity = opacity / 100;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const type = localStorage.getItem("background1");
  console.log(type);
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
      document.querySelector('body').style.backgroundImage = "url('images/background1.jpg')";
      localStorage.setItem("background1", "Zelda");
  });
  document.getElementById('paper').addEventListener('click', () => {
      document.querySelector('body').style.backgroundImage = "url('images/background2.png')";
      localStorage.setItem("background1", "paper");
  });
  document.getElementById('red').addEventListener('click', () => {
      document.querySelector('body').style.backgroundImage = "url('images/background3.jpg')";
      localStorage.setItem("background1", "red");
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
                localStorage.setItem("background1", document.body.style.backgroundImage);
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
          本项目的主要目的在于优化选课网较为丑陋的
      选课界面，并且解决只要冲突选课就无法加入预选
      表格，无法有效预览一周课程的问题。你可以先在
      本网站进行预选和调整，同时选择会出现冲突的课程，
      最终决定好要选哪些课程后再到选课网进行选课。

      1. 左侧课程选择，点击加入课程表可以加入我的课程。
      2. 我的课程中，点击移除课程可以移除课程。
      3. 当有课程冲突时，表格中会出现提示。

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

let classCount = 0;
let allCourses = []; // 存储所有课程信息
let chosenCourses = []; // 存储用户选择的课程

// 用local初始化chosenCourses和课程表
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('chosenNum') !== null && localStorage.getItem('chosenNum') !== '0') {
    console.log('local');
    let chosenNum = localStorage.getItem('chosenNum');
    for (let i = 0; i < chosenNum; i++) {
      let courseName = localStorage.getItem('chosenCourse' + i);
      allCourses.forEach(c => {
        if (c.name === courseName) {
          addClass('myCourses', c);
        }
      });
    }
  }
});

function setconflict(res) {
  localStorage.setItem('conflict', res);
}


function getRandomColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
}

function highlight(cells, fraction) {
  cells.forEach(cell => {
    let color = cell.style.backgroundColor;
    cell.style.backgroundColor = makeColorBrighter(color, fraction);
  });
};

function makeColorBrighter(color, factor = 1.2) {
    // 解析 RGB 格式的颜色
    const rgb = color.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;
  
    // 增加 RGB 值，使颜色变亮
    r = Math.min(255, Math.floor(r * factor));
    g = Math.min(255, Math.floor(g * factor));
    b = Math.min(255, Math.floor(b * factor));
  
    // 返回新的 RGB 颜色
    return `rgb(${r}, ${g}, ${b})`;
}


function addClass(parentId, course) {
  if (chosenCourses.includes(course)) {
    customElements.get('s-snackbar').show({text: '已经添加过该课程！',
                                           action: '关闭'});
    return;
  }
  chosenCourses.push(course);

  // 创建外层 div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card mb-3 chosen-course';

  // 创建 card-header div
  const cardHeaderDiv = document.createElement('div');
  cardHeaderDiv.className = 'card-header';
  cardHeaderDiv.dataset.bsToggle = 'collapse';
  cardHeaderDiv.dataset.bsTarget = '#collapse' + course.name;
  cardHeaderDiv.setAttribute('aria-expanded', 'false');
  cardHeaderDiv.setAttribute('aria-controls', 'collapse' + course.name);

  // 创建 a 标签
  const aTag = document.createElement('a');
  aTag.className = 'btn';
  aTag.textContent = course.name;

  // 将 a 标签添加到 card-header div
  cardHeaderDiv.appendChild(aTag);

  // 创建 collapse div
  const collapseDiv = document.createElement('div');
  collapseDiv.id = 'collapse' + course.name;
  collapseDiv.className = 'collapse';
  collapseDiv.setAttribute('data-bs-parent', '#accordion');

  // 创建 card-body div
  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  // 创建 p 标签
  const pTag = document.createElement('p');
  pTag.style.whiteSpace = 'pre-line';
  pTag.className = 'card-text';

  // 创建一个函数来生成带有粗体标题的文本
  function addBoldText(title, text) {
      const boldTitle = document.createElement('span');
      boldTitle.style.fontWeight = 'bold';
      boldTitle.textContent = title;

      const textNode = document.createTextNode(text);

      pTag.appendChild(boldTitle);
      pTag.appendChild(textNode);
      pTag.appendChild(document.createElement('br'));
  }

  // 添加课程信息
  addBoldText("授课教师： ", course.teacher + "\n");
  addBoldText("课程学分： ", course.credit + "\n");

  // 添加上课时间
  const boldTimeTitle = document.createElement('span');
  boldTimeTitle.style.fontWeight = 'bold';
  boldTimeTitle.textContent = "上课时间： \n";
  pTag.appendChild(boldTimeTitle);

  for (let i = 0; i < course.day.length; i++) {
      const timeText = document.createTextNode(course.day[i] + " " + (Number(course.time[i]) + 1) + " - " + (Number(course.time[i]) + Number(course.duration[i])) + "节 \n");
      pTag.appendChild(timeText);
  }
  pTag.appendChild(document.createElement('br')); 

  addBoldText("课程地点： ", course.classroom + "\n");
  addBoldText("课程简介： ", course.description);

  // 将 p 标签添加到 card-body div
  cardBodyDiv.appendChild(pTag);

  // 创建移除课程按钮
  const button = document.createElement('button');
  button.className = 'btn btn-danger';
  button.textContent = '移除课程';
  button.onclick = () => {
    chosenCourses = chosenCourses.filter(c => c !== course);   
    updateTable();
    localStorage.setItem('chosenNum', String(chosenCourses.length));
    for (let i = 0; i < chosenCourses.length; i++) {
      localStorage.setItem('chosenCourse' + i, chosenCourses[i].name);
    }
    cardDiv.remove(); 
  };
  cardBodyDiv.appendChild(button);

  // 将 card-body div 添加到 collapse div
  collapseDiv.appendChild(cardBodyDiv);

  // 将 card-header div 和 collapse div 添加到 card div
  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(collapseDiv);

  // 将 card div 添加到父容器
  document.getElementById(parentId).appendChild(cardDiv);
  updateTable();
  localStorage.setItem('chosenNum', String(chosenCourses.length));
  for (let i = 0; i < chosenCourses.length; i++) {
    localStorage.setItem('chosenCourse' + i, chosenCourses[i].name);
  }
}


function addCollapsedCard(parentId, course) {
  // 创建外层 div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card mb-3';

  // 创建 card-header div
  const cardHeaderDiv = document.createElement('div');
  cardHeaderDiv.className = 'card-header';
  cardHeaderDiv.dataset.bsToggle = 'collapse';
  cardHeaderDiv.dataset.bsTarget = '#collapse' + classCount;
  cardHeaderDiv.setAttribute('aria-expanded', 'false');
  cardHeaderDiv.setAttribute('aria-controls', 'collapse' + classCount);

  // 创建 a 标签
  const aTag = document.createElement('a');
  aTag.className = 'btn';
  aTag.textContent = course.name;

  // 将 a 标签添加到 card-header div
  cardHeaderDiv.appendChild(aTag);

  // 创建 collapse div
  const collapseDiv = document.createElement('div');
  collapseDiv.id = 'collapse' + classCount;
  collapseDiv.className = 'collapse';
  collapseDiv.setAttribute('data-bs-parent', '#accordion');

  // 创建 card-body div
  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  // 创建 p 标签
  const pTag = document.createElement('p');
  pTag.style.whiteSpace = 'pre-line';
  pTag.className = 'card-text';

  // 创建一个函数来生成带有粗体标题的文本
  function addBoldText(title, text) {
      const boldTitle = document.createElement('span');
      boldTitle.style.fontWeight = 'bold';
      boldTitle.textContent = title;

      const textNode = document.createTextNode(text);

      pTag.appendChild(boldTitle);
      pTag.appendChild(textNode);
      pTag.appendChild(document.createElement('br'));
  }

  // 添加课程信息
  addBoldText("授课教师： ", course.teacher + "\n");
  addBoldText("课程学分： ", course.credit + "\n");

  // 添加上课时间
  const boldTimeTitle = document.createElement('span');
  boldTimeTitle.style.fontWeight = 'bold';
  boldTimeTitle.textContent = "上课时间： \n";
  pTag.appendChild(boldTimeTitle);

  for (let i = 0; i < course.day.length; i++) {
      const timeText = document.createTextNode(course.day[i] + " " + (Number(course.time[i]) + 1) + " - " + (Number(course.time[i]) + Number(course.duration[i])) + "节 \n");
      pTag.appendChild(timeText);
  }
  pTag.appendChild(document.createElement('br')); 

  addBoldText("课程地点： ", course.classroom + "\n");
  addBoldText("课程简介： ", course.description);

  // 将 p 标签添加到 card-body div
  cardBodyDiv.appendChild(pTag);

  // 创建加入课程表按钮
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = '加入课程表';
  button.onclick = () => addClass('myCourses', course);
  cardBodyDiv.appendChild(button);


  // 将 card-body div 添加到 collapse div
  collapseDiv.appendChild(cardBodyDiv);

  // 将 card-header div 和 collapse div 添加到 card div
  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(collapseDiv);

  // 将 card div 添加到父容器
  document.getElementById(parentId).appendChild(cardDiv);

  classCount++;
}


// 定义一个异步函数来加载JSON文件并遍历所有课程
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
        allCourses.forEach(course => {
            // 在这里对每个课程进行处理
            // addCollapsedCard('accordion', course);
            // classCount++;
        });
    } catch (error) {
        // 处理错误
        console.error('获取课程信息时出错:', error);
    }
}

// 过滤课程
function filterCourses() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    // 清空现有的课程展示
    const accordion = document.getElementById('accordion');
    accordion.innerHTML = '';
    classCount = 0;
    if(searchInput !== '') {
      const filteredCourses = allCourses.filter(course => (course.name.toLowerCase().includes(searchInput) || course.teacher.toLowerCase().includes(searchInput) || course.department.toLowerCase().includes(searchInput)));
      // 重新添加过滤后的课程
      filteredCourses.forEach(course => {
          addCollapsedCard('accordion', course);
          classCount++;  
      });
    }
}

/**********课程表主体实现************/
function updateTable() {
  // 清空现有的课程表
  for (let i = 0; i <= 11; i++) {
      document.getElementById('mon-' + i).innerHTML = '';
      document.getElementById('mon-' + i). className = '';
      document.getElementById('mon-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('tue-' + i).innerHTML = '';
      document.getElementById('tue-' + i). className = '';
      document.getElementById('tue-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('wed-' + i).innerHTML = '';
      document.getElementById('wed-' + i). className = '';
      document.getElementById('wed-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('thu-' + i).innerHTML = '';
      document.getElementById('thu-' + i). className = '';
      document.getElementById('thu-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('fri-' + i).innerHTML = '';
      document.getElementById('fri-' + i). className = '';
      document.getElementById('fri-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('sat-' + i).innerHTML = '';
      document.getElementById('sat-' + i). className = '';
      document.getElementById('sat-' + i).style.backgroundColor = "#ffffff";
      document.getElementById('sun-' + i).innerHTML = '';
      document.getElementById('sun-' + i). className = '';
      document.getElementById('sun-' + i).style.backgroundColor = "#ffffff";
  }

  // 重新添加所有课程
  chosenCourses.forEach(course => {
      addToTable(course);
  });
}

function addToTable(course) {
  const day = course.day;
  const time = course.time;
  const duration = course.duration;
  const name = course.name;
  const classroom = course.classroom;
  const teacher = course.teacher;
  const color = getRandomColor();
  let has_confilct = false;
  for (let i = 0; i < day.length; i++) {
      for (let j = 0; j < Number(duration[i]); j++) {
          const cell = document.getElementById(day[i].toLowerCase() + '-' + (Number(time[i]) + j));
          if (cell.className === "conflict") {
            console.log('conflict');
            console.log(cell);
            const ul = cell.querySelector('.dropdown-menu');
            const liSep = document.createElement('li');
            liSep.innerHTML = '<hr class="dropdown-divider">';
            ul.appendChild(liSep);
            const li = document.createElement('li');
            // 居中
            li.setAttribute('align', 'center');
            li.innerHTML = `
              <h4>${name}</h4>
              <p>${teacher}</p>
            `;
            ul.appendChild(li);
            const out = cell.querySelector('.out');
            const li1 = document.createElement('li');
            li1.setAttribute('align', 'center');
            li1.setAttribute('style', `background-color: ${color}`);
            li1.setAttribute('class', 'conflict-item');
            li1.innerHTML = `
              <h4>${name}</h4>
            `;
            out.appendChild(li1);
          } else {
            if (cell.innerHTML !== '') {
              has_confilct = true;
              const name1 = cell.querySelector('#name').textContent;
              const classroom1 = cell.querySelector('#classroom').textContent;
              const teacher1 = cell.querySelector('#teacher').textContent;
              const oldcolor = cell.style.backgroundColor;
              cell.className = 'conflict';
              cell.style.backgroundColor = "#ffffff";
              cell.innerHTML = `
                <div class="btn-group">
                  <button type="button" class="btn btn-danger">课程冲突</button>
                  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li align="center">
                      <h4>${name1}</h4>
                      <p>${teacher1}</p>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li align="center">
                      <h4>${name}</h4>
                      <p>${teacher}</p>
                    </li>
                  </ul>
                </div>
                <ul class="out">
                  <li class="seperate"><br></li>
                </ul>
              `
              const out = cell.querySelector('.out');
              const li = document.createElement('li');
              li.setAttribute('align', 'center');
              li.innerHTML = `
                <h4>${name1}</h4>
              `;
              li.setAttribute('style', `background-color: ${oldcolor}`);
              li.setAttribute('class', 'conflict-item');
              out.appendChild(li);
              const li1 = document.createElement('li');
              li1.setAttribute('align', 'center');
              li1.innerHTML = `
                <h4>${name}</h4>
              `;
              li1.setAttribute('style', `background-color: ${color}`);
              li1.setAttribute('class', 'conflict-item');
              out.appendChild(li1);
            } else {
              cell.align = 'center';
              cell.style.backgroundColor = color;
              cell.innerHTML = `
              <h4 id='name'>${name}</h4>
              <p id='teacher'>${teacher}</p>
              `;
            }
          }
          
      }
  }
  if (has_confilct) {
    setconflict('true');
  } else {
    setconflict('false');
  }
}



// 调用函数以遍历所有课程
getAllCourses();


