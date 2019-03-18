import glob
import json
import os
import  time
import urllib2
import urlparse
import oauth2
import datetime
from poster.encode import multipart_encode
from poster.streaminghttp import register_openers

class APIError(StandardError):
    def __init__(self, msg, response=None):
        StandardError.__init__(self, msg)

class TumblrAPIv2:
    def __init__(self, consumer_key, consumer_secret, oauth_token, oauth_token_secret):
        self.consumer = oauth2.Consumer(consumer_key, consumer_secret)
        self.token = oauth2.Token(oauth_token, oauth_token_secret)
        self.url = "http://api.tumblr.com"

    def parse_response(self, result):
        content = json.loads(result)
        if 400 <= int(content["meta"]["status"]) <= 600:
            raise APIError(content["meta"]["msg"], result)
        return content["response"]

    def createPhotoPost(self, id, post):
        url = self.url + "/v2/blog/%s/post" %id

        img_file = post['data']
        del(post['data'])
        req = oauth2.Request.from_consumer_and_token(self.consumer,
                                                 token=self.token,
                                                 http_method="POST",
                                                 http_url=url,
                                                 parameters=post)
        req.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), self.consumer, self.token)
        compiled_postdata = req.to_postdata()
        all_upload_params = urlparse.parse_qs(compiled_postdata, keep_blank_values=True)

        for key, val in all_upload_params.iteritems():
            all_upload_params[key] = val[0]

        all_upload_params['data'] = open(img_file, 'rb')
        datagen, headers = multipart_encode(all_upload_params)
        request = urllib2.Request(url, datagen, headers)

        try:
            respdata = urllib2.urlopen(request).read()
        except urllib2.HTTPError, ex:
            return 'Received error code: ', ex.code

        return self.parse_response(respdata)

register_openers()

CONSUMER_KEY = ''
CONSUMER_SECRET = ''
OAUTH_TOKEN = ''
OAUTH_TOKEN_SECRET = ''

DIR = 'bot_test'
FILE_MASK = '*.gif'
BLOG = ''


api = TumblrAPIv2(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

for img in glob.glob( os.path.join(DIR, FILE_MASK) ):

    date  = time.gmtime(os.path.getmtime(img))
    post = {
        'type' : 'photo',
        'date' : datetime.datetime.now().time(),
        'data' : img,
        'tags' : time.strftime ("%Y", date) + ", photo, design, bot",
        'caption' : time.strftime ("%B %d / %Y", date)
    }

    try:
        response = api.createPhotoPost(BLOG,post)
        if 'id' in response:
            print response['id']
            #x`os.remove(img)
        else:
            print response
            break

    except APIError:
        print "Error"
        break

print "Done!"
