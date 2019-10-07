// Express Init
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const cors = require('cors');
require('custom-env').env(true);

// Express Init
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
console.log("listening on port:", port);
console.log("environment:", process.env.NODE_ENV)

const server = http.createServer(app);
server.listen(port);


// Socket Setup
const io = require('socket.io')(server);


// CORS Setup
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



// Socket Init
io.on('connection', function(client) {
    console.log("connection");
    client.on('join', function(handshake) {
        console.log(handshake);
    });
});


//// johnny-five setup
var Emitter = require("events").EventEmitter;
var emitter = new Emitter();
// const rotaryEncoder = require('./encoder');
const five = require("johnny-five");
const board = new five.Board();


//// Rotary Encoder Class
function Encoder(opts) {
    Emitter.call(this);

    var last = 0;
    var lValue = 0;
    var value = 0;
    var rotation = 0;

    var a = new five.Digital(opts.a);
    var b = new five.Digital(opts.b);

    var handler = function() {
        this.emit("data", this.value);

        var MSB = a.value;
        var LSB = b.value;
        var DEG = opts.steps
        var pos, turn;

        if (LSB === 1) {
            pos = MSB === 1 ? 0 : 1;
        } else {
            pos = MSB === 0 ? 2 : 3;
        }

        turn = pos - last;

        if (Math.abs(turn) !== 2) {
            if (turn === -1 || turn === 3) {
                value++;
            } else if (turn === 1 || turn === -3) {
                value--;
            }
        }

        last = pos;

        if (lValue !== value) {
            this.emit("change", value);
        }

        if (value % DEG === 0 && value / DEG !== rotation) {
            rotation = value / DEG;
            this.emit("rotation");
        }

        lValue = value;
    }.bind(this);

    a.on("data", handler);
    b.on("data", handler);

    Object.defineProperties(this, {
        value: {
            get: function() {
                return value;
            }
        }
    });
}

Encoder.prototype = Object.create(Emitter.prototype, {
    constructor: {
        value: Encoder
    }
});





// johnny-five init
board.on("ready", function() {
    console.log("board ready");

    //// init encoder
    var encoder = new Encoder({
        a: 3,
        b: 2,
        steps: 80
    });

    //// On Button Press WIP
    var button = new five.Switch(4);
    button.on("close", function() {
      console.log("press");
      io.emit("buttonClick");
    });

    //// On Change
    var lastData = 0;
    var range = 1;
    encoder.on("change", function() {
        data = this.value;
        console.log(data, lastData);

        if (lastData != data) {
            if (data > (lastData + range) || data < (lastData - range)) {
                if (data > lastData ) {
                    console.log("up")
                    io.emit("scrollUp", this.value);
                } else if (data < lastData) {
                    console.log("down")
                    io.emit("scrollDown", this.value);
                }

                lastData = data;
            }
        }
    });

});
