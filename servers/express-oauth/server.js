// Express Init
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const auth = require('./auth');
// const redisClient = require('./redis');

// Socket Setup
const io = require('socket.io')(server);

var users = [];
var questions = [
    {
        question: "lorem?",
        answers: ["yes", "no", "maybe", "whatever"]
    },
    {
        question: "ipsum?",
        answers: ["yes", "no", "maybe", "whatever"]
    }
];


app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());
auth(passport);
app.use(passport.initialize());
app.set('trust proxy', true);

// Direct to Login View
// app.get('/login', (req, res) => {
//     console.log(req, res);
// });


// Auth with Google Account
app.get('/login', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// Callback and set token after successful auth
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/index.html'
    }),
    (req, res) => {
        console.log("auth");

        var name = req.user.profile.displayName;
        var avatar = req.user.profile.photos[0].value
        var uid = req.user.token;

        var user = {
            name: name,
            photo_url: avatar,
            uid: uid
        }

        users.push(user);

        // console.log(name, avatar, uid);

        req.session.token = req.user.token;
        res.cookie('token', req.session.token);
        res.redirect('/index.html');
    }
);

// Check whether oauth token is set
app.get('/cookie', (req, res) => {
    console.log("cookie");
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            uid: req.session.token
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});


// Logout and Deauth
app.get('/logout', (req, res) => {
    req.logout();
    res.cookie('token', '');
    req.session = null;
    res.redirect('/');
});

// Catch unauth
app.use(function(req, res, next) {
    if (req.session.token == null && req.path.indexOf('/') === 0) {
        res.redirect('/login');
        // console.log("null")
    }
    next();
});


// Express static root
app.use("/", express.static(__dirname + '/dist/')); // Serve dist folder through express instead of NGINX


// var clients = [];
var clients = {}


function search(key, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i].uid === key) {
            return arr[i];
        }
    }
}


// Socket Init
io.on('connection', function(client) {

    client.on('storeClientInfo', async function(data) {

        if (search(data.customId, users) != undefined) {
            console.log("search", search(data.customId, users));
            // var row = new Object();
            var row = search(data.customId, users);
            row.customId = data.customId;
            row.clientId = client.id;
            row.timestamp = Date.now();
        } else if (search(data.customId, users) === undefined) {
            var row = new Object();
            row.name = "lorem"
            row.uid = data.customId;
            row.photo_url = "https://placeimg.com/200/200/any"
            row.customId = data.customId;
            row.clientId = client.id;
            row.timestamp = Date.now();
        }

        clients[data.customId] = row;

        client.join(data.customId)
        client.emit('clientId', row); // Send Unique ID to Connecting Client
        io.emit('clientArray', clients);
    });

    // Receive Event
    client.on('sendToServer', function(data) {
        console.log("Received Event", data);
        io.emit('receiveFromServer', data);
    });

    // If client disconnect
    client.on('disconnect', function(data) {
        console.log("disconnect", client.id);
        for (var property in clients) {
            if (clients.hasOwnProperty(property)) {
                // baseArray.push(clients[property]);
                // console.log(clients[property]);
                // console.log(data[tokenToPass].clientId);
                if (clients[property].clientId == client.id) {
                    delete clients[property];
                }
                console.log(clients[property]);
            }
        }
    });
});


// Start Express
server.listen(8080, function() {
    console.log('listening on *:8080');
});
