// npm i express cors

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
