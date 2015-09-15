from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

browser = webdriver.Firefox()
browser.get("http://app.fintools.com/vola/index.html")

time.sleep(5)

ticker = browser.find_element_by_id("ticker")
submitButton = browser.find_element_by_xpath("//input[@value='Calculate']")

ticker.clear()
ticker.send_keys("GOOG")
submitButton.click()
