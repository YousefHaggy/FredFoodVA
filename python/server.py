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
		tweetContent=tweet.find('p', class_='tweet-text').text.split('pic.twitter.com')
		tweetPicture=None
		if len(tweetContent)==2:
			tweetPicture=tweet.find_all("img")[1]['src']
		tweetDate=tweet.find('a',class_="tweet-timestamp")
		tweetDate=tweetDate["title"]
		tweetlist.append({'tweet':tweetContent[0],'pic':tweetPicture,'date':tweetDate,'key':tweet['data-item-id']})
	return jsonify(result=tweetlist)
if __name__=="__main__":
	app.run()