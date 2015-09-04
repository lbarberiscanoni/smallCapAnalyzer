import time
import selenium
from selenium import webdriver

browser = webdriver.Firefox()
browser.get("http://lbarberiscanoni.github.io/smallCapAnalyzer/dbInterface/dbInterface.html")

time.sleep(2)

companies = browser.find_elements_by_class_name("company")
i = 0
for company in companies:
    i += 1
    company.click()
    print str(i) + " done"
