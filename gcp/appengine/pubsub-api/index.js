const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

const worker = require('./worker');

// parse requests with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// List all Topics
app.get('/topics/list', function(req, res) {
    worker.list_topics(function(results) {
        res.status(200).send({message: results});
    });
});


// Create new Topic with topicName
app.get('/topics/create/:topicName', function(req, res) {
    // let queryData = url.parse(req.url, true).query;
    let topic = req.params.topicName;

    worker.create_topic(topic, function(results) {
        res.status(200).send({message: results.name});
    });
});


// Publish Message to Topic topicName
app.post('/post-message/:topicName', function(req, res) {

    let topic = req.params.topicName;   // Pass topicName as a param
    let data = req.body;    // Pass data to publish as request body

    // Check that topic exists
    worker.list_topics(function(results) {
        let outputResults = [];

        for (i in results) {
            let result = results[i].split('/');
            outputResults.push(result.pop());
        }

        if (outputResults.includes(topic)) {
            worker.publish_message(topic, JSON.stringify(data), function(output){
                res.send({message: output, data: data});
            })
        } else {
            res.send({message: 'No Topic By That Name, Message Not Published'});
        }

    });

});



// List All Subscriptions
app.get('/subs/list', function(req, res) {
    worker.list_all_subs(function(results) {
        res.status(200).send({message: results});
    });
});


// List All Subscriptions for Topic
app.get('/subs/list/:topicName', function(req, res) {});


// Create Subscription for Topic
app.get('/subs/create/:topicName/:subName', function(req, res) {
    let topic = req.params.topicName;
    let sub = req.params.subName;

    worker.create_sub(topic, sub, function(results) {
        res.status(200).send({message: results});
    });
});

// Create Push Subscription for Topic
app.get('/subs/create-push/:topicName/:subName', function(req, res) {
    let topic = req.params.topicName;
    let sub = req.params.subName;

    worker.create_push_sub(topic, sub, function(results) {
        res.status(200).send({message: results});
    });
});





app.get('/', function(req, res) {
    res.status(200).send()
});

// // default catch-all route
// app.get('/', (req, res) => res.status(200).send({
//     message: 'Root',
// }));



// RECEIVE PUSHED MESSAGES FROM PUBSUB
app.post('/receiver', function(req, res) {
    console.log('message received');
    messageParser(req.body);
    res.status(204).send();
});





function messageParser(data) {
    var output = JSON.parse(Buffer.from(data.message.data, 'base64').toString())
    console.log(output);
};



// Express Init
app.set('port', port);
server.listen(port);
console.log("express listening on port: ", port);
