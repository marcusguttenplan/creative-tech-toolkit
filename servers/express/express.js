const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

// parse requests with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS
app.use(cors({origin: '*'}));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res, next) {
    res.status(200).send({
        message: "/",
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on ${port}`);
