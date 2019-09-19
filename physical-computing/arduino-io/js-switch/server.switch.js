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

    switched = new five.Switch(8);



    switched.on("open", function() {
        console.log("OPEN");
    });

    switched.on("close", function() {
        console.log("CLOSED!!!! --------- ", this)
    })
});
