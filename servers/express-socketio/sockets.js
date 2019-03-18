// npm i socket.io express

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on http://localhost:${port}`);

io.on('connection', function(client) {
    console.log("connection");
    client.on('join', function(handshake) {
        console.log(handshake);
    });
    // client.emit('dataMessage', <data>)
});
