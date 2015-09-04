import time
from selenium import *
from selenium import webdriver
import mechanize
import requests
import json

browser = webdriver.Firefox()
browser.get("https://simplywall.st/snowflake/grid/micro-cap/order-by-total")

firebaseToken = "tMPTJNs7xL0hZDcEhYyPlUPkkdMqgxGJCnubtOde"
databaseURL = "https://stock-screener.firebaseio.com/simplyWS/.json"
databaseURL += "?auth=" + firebaseToken

#first, let's scroll all the way down
j = 0
while j < 88:
    #the number 88 comes from another script I ran to count just how many scrolls it took to go all the way down
    j += 1
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    companies = browser.find_elements_by_class_name("faveButton")
    print str(j) + "nth scroll - " + str(len(companies)) + " companies found"
    print "-----------------------------------------------------------------"
    time.sleep(2)

print "--------------------------------------------------"
print "about to start scraping"
print "--------------------------------------------------"
time.sleep(2)

i = 0
for company in browser.find_elements_by_class_name("faveButton"):
    i += 1

    name = company.get_attribute("data-name")
    ticker = company.get_attribute("data-symbol")

    stock = {
            "companyName": name,
            "stockTicker": ticker,
    }
    
    print "[" + str(i) + "] " + ticker + " " + name
    print "------------------------------------------------------------"

    stockPushed = requests.post(url = databaseURL, data = json.dumps(stock))
