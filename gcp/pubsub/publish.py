from google.cloud import pubsub_v1
import os



project_id = os.environ['PROJECT_ID']
topic_name = os.environ['TOPIC_NAME']
topic = 'projects/'+project_id+'/topics/'+topic_name

publisher = pubsub_v1.PublisherClient()

publisher.publish(topic, b'Event', vibration='0.01', acceleration='2.5', pressure='10', temp='10', pitch='1', yaw='1', roll='1', rfid="warehouse", cam="red light")

print("Message published")
