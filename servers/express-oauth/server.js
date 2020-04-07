// Express Init
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const auth = require('./auth');

// Socket Setup
const io = require('socket.io')(server);

var users = [];

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
    // If client disconnect
    client.on('disconnect', function(data) {
        console.log("disconnect", client.id);
    });
});


// Start Express
server.listen(8080, function() {
    console.log('listening on *:8080');
});
