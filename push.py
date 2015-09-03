import requests
import json


firebaseToken = "tMPTJNs7xL0hZDcEhYyPlUPkkdMqgxGJCnubtOde"
databaseURL = "https://stock-screener.firebaseio.com/simplyWS"
databaseURL += "?auth=" + firebaseToken

name = raw_input("name: ")
ticker = raw_input("ticker: ")

stock = {
        "companyName": name,
        "stockTicker": ticker,
}

stockPushed = requests.post(url = databaseURL, data = json.dumps(stock))
str(json.loads(stockPushed.content).values()[0])
