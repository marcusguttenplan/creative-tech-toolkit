var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var phidget22 = require('phidget22');
var phidgetPort = 5661;
const io = require('socket.io')(server, {
    wsEngine: 'ws'
});


////
//// Helpers
////

//// Dedupe Array
function removeDuplicates(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(x) {
    var key = keyFn(x), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

//// Create Aggregate Object to Pass
var globalAggregates = {
    top20: [],
    bottom20: [],
    mid20: [],
    upper20: [],
    full: []
};


//// Parse GeoJSON and create aggregate counts
function parseData(features, callback) {

    // Remove Duplicate NO values from GeoJSON
    var props = removeDuplicates(x => x.properties.no, features);

    // Sort De-duped array by NO descending
    props.sort(function(p1, p2) {
        return p2.properties.no - p1.properties.no;
    });

    globalAggregates.full = props;

    // Slice array at different points for core sample
    globalAggregates.top20 = props.slice(0, 20);
    globalAggregates.bottom20 = props.slice(-20);
    globalAggregates.mid20 = props.slice(props.length/2 - 20, props.length/2);
    globalAggregates.upper20 = props.slice(props.length/4 - 20, props.length/4);

    callback(globalAggregates);
}


////
//// Socket.IO
////

// CLient Connect
io.on('connection', function (client) {
    console.log('Client connected...');

    client.screen_id = client.handshake.query.id;
    client.join(client.handshake.query.id);

    io.emit('clientCounter', io.engine.clientsCount);

    client.on('dataOut',function(data){
        console.log("grabbed data", data.length);
        parseData(data, function(result, err){
            console.log("emit");
            io.emit('aggregate', result);
        });
    });

    mainPhidget();

});


function mainPhidget() {

    let phidgetServer = new phidget22.Connection(phidgetPort, 'localhost');
    phidgetServer.connect()
        .then(runCode)
        .catch(function (err) {
            console.log('Error running:' + err);
            // process.exit(1);
        });
}

function runCode() {
    //ROTARY ENCODE AND SWITCH
    let di0 = new phidget22.DigitalInput();
    di0.setChannel(0);
    di0.open().then(function (di) {
        console.log("Button 0 connected");
        di.onStateChange = selectChange;

    }).catch(function (err) {
        console.log('failed to open the channel:' + err);
    });
}

function selectChange(state) {
    if (state){
        io.to(1).emit('ramp_up', {});
    }else{
        io.to(1).emit('ramp_down', {});
    }
}




////
//// express server
////

// Serve public dir
app.use('/', express.static(path.join(__dirname, '/public')));

// Listen
server.listen(3000, function(){
    console.log('listening on *:3000');
})
