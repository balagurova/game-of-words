import codecs
from re import L
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time 
import requests

driver = webdriver.Firefox(executable_path = '/Users/balagurova/Documents/aalto/Studio/Cleaning-data-python/scraping/geckodriver')

driver.get("file:///Users/balagurova/Documents/aalto/Studio/Cleaning-data-python/usa.html")

elements = driver.find_elements(By.CSS_SELECTOR, ".date, .show-name, .result")
today = "24 апреля 2022 года"
#link = ""
with open("./usa.tsv","a") as f:
    for element in elements:
        if "date" in element.get_attribute("class"):
            today = element.text  
            print(today)
        elif "result" in element.get_attribute("class"):            
            link = element.get_attribute('href')        
        else:
            msg = today + '\t' + element.text + '\t' + '\t' + link + '\n'    
            print(msg)        
            f.write(msg)
    print('done')
