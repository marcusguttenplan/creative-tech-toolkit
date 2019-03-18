require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);


var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<project_id>.firebaseio.com"
});

var db = admin.database();
var ref = db.ref();
var usersRef = ref.child('users');



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
    ref.once("value", function(snapshot) {
      console.log(snapshot.val());
    });
    res.status(200).send()
});

app.post('/firebase', function(req, res) {
    console.log("firebase hit");
    messageParser(req.body);
    res.status(204).send({message: res.status, data: req.body});
});

// RECEIVE PUSHED MESSAGES
app.post('/receiver', function(req, res) {
    console.log('message received');
    messageParser(req.body);
    res.status(204).send();
});


function messageParser(data) {
    var userRef = usersRef.push();
    usersRef.push({
      username: data.username,
      data: data.data
    });
    console.log("message parsed:", data);
};



// Express Init
app.set('port', port);
server.listen(port);
console.log("express listening on port: ", port);
