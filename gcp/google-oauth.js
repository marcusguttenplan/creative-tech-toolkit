const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const http = require('http').Server(app);
var fs = require("fs");


/************************************************************************/
var request = require('request');
var googleAuth = require('google-auto-auth');
var dataString = fs.readFileSync("multi-inst-req-body.json");
 
var authConfig = {
    keyFilename: 'creds.json',
    projectId: '<PROJECT_ID>',
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
};
 
// Create a client
var auth = googleAuth(authConfig);
 
// auth.authorizeRequest({/*...*/}, function (err, authorizedReqOpts) {});
auth.getToken(function (err, token) {
    console.log(token);
    if ( token ){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        };
        
        var options = {
            url: 'https://ml.googleapis.com/v1/projects/<PROJECT_NAME>/models/<MODEL_NAME>/versions/<VERSION_NAME>:predict',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(body);
            }
        }

        request(options, callback);
    }
});
