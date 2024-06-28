from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import re

# 初始化WebDriver
driver = webdriver.Chrome()  # 替换为你的chromedriver路径
driver.get('https://dean.pku.edu.cn/service/web/courseSearch.php')

# 最小化
driver.minimize_window()

# 等待页面加载并选择学期
wait = WebDriverWait(driver, 10)
semester_select = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="sub_content"]/div/div[1]/div[1]/div[2]/span[4]')))
semester_select.click()

# 选择“全部”
category_select = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="sub_content"]/div/div[1]/div[2]/div[2]/div/span[1]/a')))
category_select.click()

# 选择“信息科学技术学院”
school_select = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="sub_content"]/div/div[1]/div[3]/div[2]/div/span[26]/a')))
school_select.click()



# 点击查询按钮
search_button = driver.find_element(By.ID, 'search1')
search_button.click()

time.sleep(50)

course_table = driver.find_element(By.ID, 'fc_content')
rows = course_table.find_elements(By.TAG_NAME, 'tr')
course_list = []
pattern = r'星期([一二三四五六日])\(第(\d+)节-第(\d+)节\)'
day_mapping = {
        '一': 'MON',
        '二': 'TUE',
        '三': 'WED',
        '四': 'THU',
        '五': 'FRI',
        '六': 'SAT',
        '日': 'SUN'
    }
for row in rows[0:]:  # 跳过表头
    cols = row.find_elements(By.TAG_NAME, 'td')
    course_info = {
        'ID': cols[1].text.strip(),
        'name': cols[2].text.strip(),
        'department': cols[3].text.strip(),
        'credit': cols[6].text.strip(),
        'day': [],
        "time": [],
        'duration': [],
        'teacher': cols[7].text.strip(),
        'description': '',
        'classroom': ''
    }
    lines = cols[8].text.strip().split('\n')
    
    for line in lines:
        match = re.match(pattern, line)
        if match:
            day, start_time, end_time = match.groups()
            course_info['day'].append(day_mapping[day])
            course_info['time'].append(str(int(start_time) - 1))
            course_info['duration'].append(str(int(end_time) - int(start_time) + 1))

    course_list.append(course_info)

# 去除同名课程，只保留一个
unique_courses = {}
for course in course_list:
    if course['name'] not in unique_courses:
        unique_courses[course['name']] = course

# 将字典转换回列表
course_list = list(unique_courses.values())

data = {"classes" : course_list}

with open('JSON/classdata.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

