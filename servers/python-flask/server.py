from flask import request
from flask import Flask
from dotenv import load_dotenv
from google.cloud import storage
import pkgutil
import json
import os

# load env vars
load_dotenv()


# init flask
app = Flask(__name__)


# Open JSON and create list
# users_file = open('file.json')
# users = json.load(users_file)


# API index / route
@app.route('/')
def index():
    print('/ requested')

    # just send routes to requester
    return "/user, /email"


# API /badge route
@app.route('/endpoint1', methods=['POST'])
def recommend():
    print('/badge requested')

    # Get request params
    data = request.get_json()

    return 'cool'


# API /email route TODO
@app.route('/endpoint2', methods=['POST'])
def predict():
    print('/email requested')

    # Get request params
    data = request.get_json()

    return 'cool'


# init server on env var PORT
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.getenv('PORT'))
