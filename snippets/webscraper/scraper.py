from bs4 import BeautifulSoup
import requests
import time
import random
import sys
import re
import requests
import os
import time
import random
import json
import csv
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


options = webdriver.ChromeOptions()
# options.add_argument("--kiosk");
capa = DesiredCapabilities.CHROME
capa["pageLoadStrategy"] = "none"
driver = webdriver.Chrome('/Users/mguttenplan/Dropbox/_sparks/_backoffice/_dev/device-scraper/chromedriver', chrome_options=options, desired_capabilities=capa)
service_log_path=os.path.devnull
wait = WebDriverWait(driver, 20)

urls = ['https://material.io/tools/devices/']

# with open('urls.txt', 'r') as f:
#     for line in f:
#         urls.append('https://www.sunglasshut.com/us/%s' % line.rstrip())
#     # print urls

for url in urls:
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

    driver.get(url)
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.device-row')))

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    outArr = []

    with open('device_file.csv', mode='w') as output_file:

        outwriter = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        outwriter.writerow(['Device', 'Screen Dims', 'DPH', 'DPW', 'PXH', 'PXW', 'Ratio', 'PPI', 'Type'])

        for tag in soup.find_all('div', {'class':'device-row'}):
            type = tag.find('div', {'class':'type'}).text
            device = tag.find('div', {'class':'device'}).text
            platform = tag.find('div', {'class':'platform'}).text
            screen_dims = tag.find('div', {'class':'screen-size'}).text
            aspect = tag.find('div', {'class':'aspect-ratio'}).text
            density = tag.find('div', {'class':'density'}).text
            dpw = '0'
            dph = '0'
            pxw = '0'
            pxh = '0'
            dp = tag.find('div', {'class':'screen-dp'})
            px = tag.find('div', {'class':'screen-px'})

            if dp is not None:
                dpw = tag.find('div', {'class':'screen-dp'}).find('span', {'class':'value-width'}).text
                dph = tag.find('div', {'class':'screen-dp'}).find('span', {'class':'value-height'}).text

            if px is not None:
                pxw = tag.find('div', {'class':'screen-px'}).find('span', {'class':'value-width'}).text
                pxh = tag.find('div', {'class':'screen-px'}).find('span', {'class':'value-height'}).text


            outwriter.writerow([device.encode('utf-8').strip(), screen_dims.encode('utf-8').strip(), dph.encode('utf-8').strip(), dpw.encode('utf-8').strip(), pxh.encode('utf-8').strip(), pxw.encode('utf-8').strip(), aspect.encode('utf-8').strip(), density.encode('utf-8').strip(), type.encode('utf-8').strip()])


        # outArr.append(output)

    # print outArr
    # convert into JSON:
    # y = json.dumps(outArr)

driver.quit()
