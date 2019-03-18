const PubSub = require('@google-cloud/pubsub');
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
// The name for the new topic
// const topicName = process.env.TOPIC;     // ENV VARIABLE
const pubsubClient = new PubSub({
    projectId: projectId,
});



function sensorRead() {

        let topic = 'devices';
        let data = {
            'important': 110,
            'name': 'lorne ipsum',
            'volume': 2.0
        };

        // Check that topic exists
        list_topics(function(results) {
            let outputResults = [];

            for (i in results) {
                let result = results[i].split('/');
                outputResults.push(result.pop());
            }

            if (outputResults.includes(topic)) {
                publish_message(topic, JSON.stringify(data), function(output){
                    console.log({message: output, data: data});
                })
            } else {
                console.log({message: 'No Topic By That Name, Message Not Published'});
            }

        });
}

sensorRead()

// Send New PubSub Message To Topic
function publish_message(topicName, data, callback) {
    const dataBuffer = Buffer.from(data);

    pubsubClient
        .topic(topicName)
        .publisher()
        .publish(dataBuffer)
        .then(messageId => {
            // console.log(`Message ${messageId} published.`);
            callback(messageId);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

}

// Call PubSub Client and Get List of Topics
function list_topics(callback) {
    pubsubClient.getTopics().then(results => {
        let topics = results[0];
        let names = [];
        // console.log('Topics:');
        // topics.forEach(topic => console.log(topic.name));
        topics.forEach(topic => names.push(topic.name));
        callback(names);
    }).catch(err => {
        console.error('ERROR:', err);
    });
}
