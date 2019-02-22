from flask import Flask, request
import requests
import json
from flask import jsonify 
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/getUser')
def hello_world():


	url = "https://api.twitch.tv/kraken/users"

	querystring = {"login": request.args.get('streamer')}

	payload = ""
	headers = {
	    'Client-ID': "vkl567djmcan9haxeej2z38zi2081f",
	    'Accept': "application/vnd.twitchtv.v5+json",
	    'cache-control': "no-cache",
	    'Postman-Token': "f54c2dc0-acc9-44f4-8ef6-46bc696aae07"
	    }

	response = requests.request("GET", url, data=payload, headers=headers, params=querystring)

	json_data = json.loads(response.text)
	if json_data["_total"] == 0: 
		return("streamer doesnt exsist")
	
	users = (json_data['users'])
	#print(users)
	
	for user in users:
		temp_dic = {}
		temp_dic['display_name'] = user['display_name']
		temp_dic['_id'] = user['_id']
		temp_dic['name'] = user['name']
		temp_dic['logo'] = user['logo']

		url = "https://api.twitch.tv/helix/streams"
		print(user['_id'])
		querystring = {"user_id": str(user['_id'])}

		payload = ""
		headers = {
		    'Client-ID': "vkl567djmcan9haxeej2z38zi2081f",
		    'cache-control': "no-cache",
		    'Postman-Token': "57df971b-f581-4414-9861-c39e546ca6dc"
		    }

		responseLive = requests.request("GET", url, data=payload, headers=headers, params=querystring)

		json_user = json.loads(responseLive.text)
		
		user_data = (json_user['data'])

		if(user_data != []):
			temp_dic['isLive'] = 'live'
		else:
			temp_dic['isLive'] = 'inactive'

		#streamFacts = (json)
			
		return(jsonify(temp_dic))