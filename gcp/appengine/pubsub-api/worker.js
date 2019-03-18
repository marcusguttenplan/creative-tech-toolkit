const PubSub = require('@google-cloud/pubsub');
require('dotenv').config();


const projectId = process.env.PROJECT_ID;
// The name for the new topic
// const topicName = process.env.TOPIC;     // ENV VARIABLE
const pubsubClient = new PubSub({
    projectId: projectId,
});


// TEST FUNC
function worker(method, msg) {
    console.log("worker");
    return "worker";
}


// Call PubSub Client and Create a New Topic
function create_topic(topicName, callback) {
    pubsubClient
        .createTopic(topicName)
        .then(results => {
            let topic = results[0];
            console.log(`Topic ${topic.name} created.`);
            callback(topic);
        })
        .catch(err => {
            console.error('ERROR:', err);
            callback(err);
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


function list_all_subs(callback) {
  // Lists all subscriptions in the current project
  pubsubClient
    .getSubscriptions()
    .then(results => {
      const subscriptions = results[0];
      let subs = [];

      // console.log('Subscriptions:');
      // subscriptions.forEach(subscription => console.log(subscription.name));
      subscriptions.forEach(subscription => subs.push(subscription.name));
      callback(subs);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}





function list_subs_by_topic(topicName, callback) {
  pubsubClient
    .topic(topicName)
    .getSubscriptions()
    .then(results => {
      const subscriptions = results[0];
      let subs = [];

      // console.log(`Subscriptions for ${topicName}:`);
      // subscriptions.forEach(subscription => console.log(subscription.name));
      subscriptions.forEach(subscription => subs.push(subscription.name));
      callback(subs);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}





function create_sub(topicName, subscriptionName, callback) {
    pubsubClient
        .topic(topicName)
        .createSubscription(subscriptionName)
        .then(results => {
            const subscription = results[0];
            console.log(`Subscription ${subscriptionName} created.`);
            callback(`Subscription ${subscriptionName} created.`)
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}



// *****
//
// Create new Push Subscription
// BUILT FOR APPENGINE
//
// *****
function create_push_sub(topicName, subscriptionName, callback) {
  console.log("push request received");

  const options = {
    pushConfig: {
      // Set to an HTTPS endpoint of your choice. If necessary, register
      // (authorize) the domain on which the server is hosted.
      pushEndpoint: `https://${pubsubClient.projectId}.appspot.com/receiver`,   // App Engine Engpoint
      // pushEndpoint: 'http://localhost:8000/receiver'
    },
  };

  pubsubClient
    .topic(topicName)
    .createSubscription(subscriptionName, options)
    .then(results => {
      const subscription = results[0];

      console.log(`Subscription ${subscriptionName} created.`);
      callback(`Subscription ${subscriptionName} created.`)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}


module.exports = {
    worker: worker,
    create_topic: create_topic,
    list_topics: list_topics,
    publish_message: publish_message,
    list_all_subs: list_all_subs,
    list_subs_by_topic: list_subs_by_topic,
    create_sub: create_sub,
    create_push_sub: create_push_sub
};
