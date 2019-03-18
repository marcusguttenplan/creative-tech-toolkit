var phidget22 = require('phidget22');
var phidgetPort = 5661;

const port = 1956;//process.env.PORT || 51010;
const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    wsEngine: 'ws'
});

io.on('connection', function(socket) {
    socket.screen_id = socket.handshake.query.id;
    socket.join(socket.handshake.query.id);
    socket.on('1956_cloud_worker', function(data) {
        io.to(socket.screen_id).emit('1956_cloud_worker', data);
    });
    
    //// Commented out 08/28/2018 by mguttenplan and Pushed to `tokyo_fanless`
    // socket.on('fan-on', function (data) {
    //     switchRelay(data, true);
    //
    // });
    // socket.on('fan-off', function(data) {
    //     switchRelay(data, false);
    // });
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/framework_files', express.static(__dirname + '/framework_files'));
app.use('/char_data', express.static(__dirname + '/char_data'));
app.use('/jquery.js', express.static(__dirname + '/node_modules/jquery/dist/jquery.min.js'));
app.use('/admin.html', express.static(__dirname + '/admin.html'));

// healthcheck
app.get('/_health', function (req, res) {
  // add any necessary business logic (db connection, etc)
  res.status(200).send({ ok: true });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//// Commented out 08/28/2018 by mguttenplan and Pushed to `tokyo_fanless`
// main();
// function main() {
//
//     let phidgetServer = new phidget22.Connection(phidgetPort, 'localhost');
//     phidgetServer.connect()
//         .then(runCode)
//         .catch(function (err) {
//             console.log('Error running:' + err);
//             process.exit(1);
//         });
// }

http.listen(port, function() {
    console.log('listening on *:' + port);
});


//// Commented out 08/28/2018 by mguttenplan and Pushed to `tokyo_fanless`
// // r1 - white trello
// // r2 - red jira
// // r3 - green sysco
// // r4 - red vmware
// // r5 - blue sp
// // r6 - blue salesforce
// // r7 - yellow dialpad
//
//
//
// function switchRelay(data, state){
//     // YOUR CODE HERE
//
//     console.log(data, state);
//     switch(data.data) {
//         case 'Trello_ScreenRecording_V06.mp4':
//             r1.setState(state);
//             break;
//         case 'Jira_ScreenRecording_V06.mp4':
//             r2.setState(state);
//             break;
//         case 'Cisco_WebEx_V03.mp4':
//             r3.setState(state);
//             break;
//         case 'VMware_ScreenRecording_V05.mp4':
//             r4.setState(state);
//             break;
//         case 'AdobeSpark_ScreenRecording_V05.mp4':
//             r5.setState(state);
//             break;
//         case 'Salesforce_ScreenRecording_V04.mp4':
//             r6.setState(state);
//             break;
//         case 'Dialpad_ScreenRecording_V04.mp4':
//             r7.setState(state);
//     }
//
// }
//
// // put relays in global scope
// let r0;
// let r1;
// let r2;
// let r3;
// let r4;
// let r5;
// let r6;
// let r7;
//
// function runCode() {
//
//     // relay 1
//     let relay1 = new phidget22.DigitalOutput();
//     relay1.setChannel(1);
//     relay1.setDeviceSerialNumber(521731);
//     let relay2 = new phidget22.DigitalOutput();
//     relay2.setDeviceSerialNumber(521731);
//     relay2.setChannel(2);
//     let relay3 = new phidget22.DigitalOutput();
//     relay3.setDeviceSerialNumber(521731);
//     relay3.setChannel(3);
//
//     // relay 2
//     let relay4 = new phidget22.DigitalOutput();
//     relay4.setChannel(0);
//     relay4.setDeviceSerialNumber(521765);
//     let relay5 = new phidget22.DigitalOutput();
//     relay5.setDeviceSerialNumber(521765);
//     relay5.setChannel(1);
//     let relay6 = new phidget22.DigitalOutput();
//     relay6.setDeviceSerialNumber(521765);
//     relay6.setChannel(2);
//     let relay7 = new phidget22.DigitalOutput();
//     relay7.setDeviceSerialNumber(521765);
//     relay7.setChannel(3);
//
//     // relay 1
//     relay1.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r1 = r;
//         r1.setState(false);
//     }
//     relay2.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r2 = r;
//         r2.setState(false);
//     }
//     relay3.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r3 = r;
//         r3.setState(false);
//     }
//
//     // relay 2
//     relay4.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r4 = r;
//         r4.setState(false);
//     }
//     relay5.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r5 = r;
//         r5.setState(false);
//     }
//     relay6.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r6 = r;
//         r6.setState(false);
//     }
//     relay7.onAttach = function(r){
//         console.log(r.getDeviceSerialNumber() + " : " + r.getChannel());
//         r7 = r;
//         r7.setState(false);
//     }
//
// 	manager = new phidget22.Manager();
//
// 	manager.onAttach = function (ch) {
//         console.log(ch + ' attached');
//         var serialNumber = ch.getDeviceSerialNumber();
//         var channelNumber = ch.getChannel();
//         if(serialNumber == "521731"){
//             setupFirstPhidget(channelNumber);
//         } else {
//             setupSecondPhidget(channelNumber);
//         }
// 	};
//
// 	manager.onDetach = function (ch) {
// 		console.log(ch + ' detached');
// 	};
//
//     manager.open();
//
//     function setupFirstPhidget(ch){
//         switch(ch){
//             case 0:
//                 break;
//             case 1:
//                 relay1.open();
//                 break;
//             case 2:
//                 relay2.open();
//                 break;
//             case 3:
//                 relay3.open();
//                 break;
//         }
//     }
//
//     function setupSecondPhidget(ch){
//         switch(ch){
//             case 0:
//                 relay4.open();
//                 break;
//             case 1:
//                 relay5.open();
//                 break;
//             case 2:
//                 relay6.open();
//                 break;
//             case 3:
//                 relay7.open();
//                 break;
//         }
//     }
// }
