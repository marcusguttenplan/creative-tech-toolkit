require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const lodash = require('lodash');
var path = require("path");

// parse requests with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Request Loggin with morgan
app.use(morgan('dev'));

// Routes
app.use('/', express.static(path.join(__dirname, 'root')));
app.use('/emotion', express.static(path.join(__dirname, 'emotion')));
app.use('/pose', express.static(path.join(__dirname, 'pose')));

// Express Init
app.set('port', port);
server.listen(port);
console.log("express listening on port: ", port);
