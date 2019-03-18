// // Express Init
// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
//
//// Socket Setup
// const io = require('socket.io')(server);
//
// // Socket Init
// io.on('connection', function(client) {
//
//     // Get Count of Connected Clients and Emit Count to each Client
//     console.log('New client connected; CURRENT COUNT: ', io.engine.clientsCount);
//     io.emit('clientCounter', io.engine.clientsCount,'utf-8');
//
// });
//
//
// // Start Express
// server.listen(3000, function(){
//     console.log('listening on *:3000');
// });

//// johnny-five setup
const five = require("johnny-five");
const board = new five.Board();

// johnny-five init
board.on("ready", function() {
    console.log("board ready");

    prox = new five.Proximity({
        controller: "MB1000",
        pin: "A0",
        freq: 250
    });

    prox.on("data", function() {
        // console.log(this.value);
        console.log("inches: ", this.inches);
        console.log("cm: ", this.cm);
    });
});
