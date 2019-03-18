# PubSub API for AppEngine

This is a repo with an extremely basic (and insecure) implementation of an Express API that can create and consume new PubSub topics and subscriptions, built to be deployed to AppEngine.

**IF NOT USING APPENGINE, REQUIRES AN SSL CERT**

### Requirements

* nodejs (8+)
* gcloud binary + gcp project creds
* PubSub API enabled

### Usage

`index.js` contains Express endpoints:
* `GET /topics/list` lists all topics
* `GET /topics/create/<topicName>` create topic with `topicName`
* `POST /topics/post-message/<topicName>` post new message to topic with `topicName`
* `GET /subs/list` list all subscriptions
* `GET /subs/list/<topicName>` list all subscriptions for topic with `topicName`
* `GET /subs/create/<topicName>/<subName>` create a new subscription `subName` for topic `topicName`
* `POST /receiver` **HTTPS endpoint required to receive push subscriptions**

`worker.js` contains nodejs PubSub client functions:
* Create Topic
* List all Topics
* Publish Message
* List all Subscriptions
* List all Subscriptions by Topic
* Create Subscription
* Create Push Subscription
