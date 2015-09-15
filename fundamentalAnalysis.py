from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

stockTicker = raw_input("stock ticker: ")
url = "http://finance.yahoo.com/q?s=" + stockTicker.upper() + "&fr=uh3_finance_web&uhb=uhb2"
browser = webdriver.Firefox()
browser.get(url)

