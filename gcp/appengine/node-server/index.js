require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);


//
// EXPRESS INIT
//

// parse requests with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// CORS
app.use(cors());

// GET Driver
app.get('/driver', function(req, res) {
    console.log("Driver Data Requested");
    res.status(200).send({message: "/driver", data: {}});
});

// GET Fleet
app.get('/fleet', function(req, res) {
    console.log("Fleet Data Requested");

    // let category = req.params.category;
    // console.log(category);
    res.status(200).send({message: "/fleet", data: {}});
});

// GET Root
app.get('/', function(req, res) {
    res.status(200).send()
});

// POST Data
app.post('/data', function(req, res) {
    console.log('Data Received');
    res.status(200).send({message: "/data", data: {}});
});

// POST Data
app.post('/start', function(req, res) {
    console.log('Start Received');
    res.status(200).send({message: "/start", data: {}});
});

// POST Data
app.post('/stop', function(req, res) {
    console.log('Stop Received');
    res.status(200).send({message: "/stop", data: {}});
});


// Express Init
app.set('port', port);
server.listen(port);
console.log("express listening on port: ", port);
