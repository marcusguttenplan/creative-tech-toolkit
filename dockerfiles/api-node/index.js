// var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var redis = require('redis');
var client = redis.createClient('redis://redis:6379'); // this creates a new client

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});



app.get("/", (req, res) => {
  console.log("Hello world received a request.");

  client.set('my test key', 'my test value', redis.print);
  client.get('my test key', function (error, result) {
      if (error) {
          console.log(error);
          throw error;
      }
      console.log('GET result ->' + result);
  });

  const target = process.env.MESSAGE || "World";
  res.send(`Hello ${target}!`);
});

// http.createServer(function (req, res) {
//     console.log("Server Created!")
//   // res.writeHead(200, {'Content-Type': 'text/html'});
//   // res.end(`<h1>${process.env.MESSAGE}</h1>`);
// }).listen(8000);

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Listening on port', port);
});
