require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);


// parse requests with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/api/', function(req, res) {
    console.log("API hit");
    res.status(200).send({message: "API hit"});
});

app.get('/api/:category', function(req, res) {
    let category = req.params.category;
    console.log(category);
    res.status(200).send({message: "API hit", category: category});
});

app.get('/', function(req, res) {
    res.status(200).send()
});

// RECEIVE PUSHED MESSAGES
app.post('/receiver', function(req, res) {
    console.log('message received');
    messageParser(req.body);
    res.status(204).send();
});


function messageParser(data) {
    // var output = JSON.parse(Buffer.from(data.message.data, 'base64').toString())
    // console.log(output);
    console.log("message parsed:", data);
};



// Express Init
app.set('port', port);
server.listen(port);
console.log("express listening on port: ", port);
