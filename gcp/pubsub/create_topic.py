from google.cloud import pubsub_v1
import os

project_id = os.environ['PROJECT_ID']
topic_name = os.environ['TOPIC_NAME']

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)

topic = publisher.create_topic(topic_path)

print("Topic created: {}".format(topic))
