// server declatations
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const cors = require('cors');

// photo upload decarlations
const multer = require("multer");
const gm = require("gm").subClass({imageMagick: true});
const fs = require("fs");
const uuidv4 = require("uuid/v4");
path = require("path");

// dotenv declaration
const dotenv = require('dotenv');
dotenv.config();

////
//// init Express
////
const app = express();


// //// init CORS
// var whiteList = {
//     // "http://localhost:8080": true,
//     // "http://localhost:8081": true,
//     // "http://localhost:3000": true,
//     // "sparks-interactive.com": true,
//     "*": true
// };
//
// var allowCrossDomain = function(req, res, next) {
//         if(whiteList[req.headers.origin]){
//             res.header('Access-Control-Allow-Credentials', true);
//             res.header('Access-Control-Allow-Origin', req.headers.origin);
//             res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//             res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');
//             next();
//         }
// };
// app.use(allowCrossDomain);

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// parse requests
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

// Express static root
app.use("/", express.static(__dirname + '/dist/')); // Serve dist folder through express instead of NGINX





app.get("/", (req, res) => {
  console.log("/");

  const target = process.env.MESSAGE || "World";
  res.send(`${target}!`);
});


app.post("/api", (req, res) => {
    console.log("/api");
    console.log(req.body);

    res.sendStatus(200);
});


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
console.log("listening on port", port)

const server = http.createServer(app);
server.listen(port);
