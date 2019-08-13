from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS
import requests
app=Flask(__name__)
CORS(app)
@app.route('/return_tweets')
def _return_tweets():
	tweetlist=[]
	result= requests.get("http://twitter.com/fredfoodva")
	c= result.content
	soup= BeautifulSoup(c,'lxml')
	tweetsMainDiv= soup.find_all('div',class_="tweet")
	for tweet in tweetsMainDiv:
		tweetContent=tweet.find('p', class_='tweet-text').text.split('pic.twitter.com')[0]
		tweetlist.append({tweet['data-item-id']:tweetContent})
	tweetlistReverse={}
	return jsonify(result=tweetlist)
if __name__=="__main__":
	app.run()