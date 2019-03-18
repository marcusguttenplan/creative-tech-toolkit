// var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.get("/", (req, res) => {
  console.log("Hello world received a request.");

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
