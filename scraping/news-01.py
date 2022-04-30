import codecs
from re import L
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time 
import requests

search = 'США'

with open("./usa.html","a") as f:
    for offset in range(0, 25900, 15):
        response = requests.get(f"https://www.1tv.ru/search/news.js?from=1995-01-01&limit=10&offset={offset}&q=text%3A{search}&to=2022-04-24")
        txt = response.text
        txt = txt.replace("var title = ","")
        txt = txt.replace('"Найдено 25908 результатов:"','')
        txt = txt.replace("$('@search_title').html(title).removeClass('searching');","")
        txt = txt.replace("$('@search_results').append(","")
        txt = txt.replace("$('@@search_more').trigger('loaded');","")
        txt = txt.replace("$('@@search_field').trigger('search_activate');","")
        txt = txt.replace("$('@date_range').removeClass('searching');","")
        txt = txt.replace("\n","")
        txt = txt.replace("\/","/")
        txt = codecs.escape_decode(bytes(txt, "utf-8"))[0].decode("utf-8")
        print(offset)
        f.write(txt)
    print('done')