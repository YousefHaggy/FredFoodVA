from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from flask_cors import CORS
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
import requests
app=Flask(__name__)
CORS(app)
tokenList=[]
def send_push_message(token,message,extra=None):
	try:
		response=PushClient().publish(PushMessage(to=token,body=message,data=extra))
	except PushServerError as exc:
		rollbar.report_exec_info(
			extra_data={
				'token': token,
				'message': message,
				'extra': extra,
				'errors': exc.errors,
				'response_data': exc.response_data,
			})
		raise
	except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
		rollbar.report_exc_info(
		extra_data={'token': token, 'message': message, 'extra': extra})
		raise self.retry(exc=exc)

	try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
		response.validate_response()
	except DeviceNotRegisteredError:
        # Mark the push token as inactive
		from notifications.models import PushToken
		PushToken.objects.filter(token=token).update(active=False)
	except PushResponseError as exc:
        # Encountered some other per-notification error.
		rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
		raise self.retry(exc=exc)


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
@app.route('/push_token', methods=['POST'])
def _add_new_token():
	req_data=request.get_json()
	token = req_data['token']['value']
	global tokenList
	tokenList.append(token)
	return "Subscribed"
if __name__=="__main__":
	app.run()