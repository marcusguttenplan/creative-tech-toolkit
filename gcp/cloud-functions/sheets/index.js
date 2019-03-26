const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const { IncomingWebhook } = require('@slack/client');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);


const rawSlack = {
    "attachments": [{
        "fallback": "Email received from _________ on _________",
        "color": "#36a64f",
        "pretext": "Message from ________ on ________",
        // "title": "Reply",
        // "title_link": "mailto:_______",
        "fields": [],
        "footer": "Contact Bot! Email Back.",
        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        "ts": 123456789
    }]
}

exports.contactForm = (req, res) => {
    console.log("Function Fired!");
    console.log("___________________________________");

    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method == 'OPTIONS') {
        res.status(204).send('');
    }




    var doc = new GoogleSpreadsheet('<sheet-id>');
    var sheet;
    var bodyData = {}

    function parseBody(data) {
        bodyData.date = new Date();
        if (data.name) {
            bodyData.name = data.name

            rawSlack.attachments[0].pretext = "Email received from " + data.name + " on " + bodyData.date;
            rawSlack.attachments[0].fallback = "Email received from " + data.name + " on " + bodyData.date;

            var push = {
                "title": "Name",
                "value": data.name,
                "short": false
            }
            rawSlack.attachments[0].fields.push(push);
            var push = {}

        }
        if (data.email) {
            bodyData.email = data.email
            var push = {
                "title": "Email",
                "value": "<mailto:" + data.email + ">",
                "short": false
            }
            rawSlack.attachments[0].fields.push(push);
            var push = {}

        }
        if (data.company) {
            bodyData.company = data.company

            var push = {
                "title": "Company",
                "value": data.company,
                "short": false
            }
            rawSlack.attachments[0].fields.push(push);
            var push = {}
        }
        if (data.message) {
            bodyData.message = data.message

            var push = {
                "title": "Message",
                "value": data.message,
                "short": false
            }
            rawSlack.attachments[0].fields.push(push);
            var push = {}
        }

        console.log("parsed", bodyData, data);
    }

    async.series([
        function parse(step) {
            parseBody(req.body);
            step();
        },
        function setAuth(step) {
            var creds = require('./credentials.json');
            doc.useServiceAccountAuth(creds, step);
        },
        function sheetInfo(step) {
            doc.getInfo(function(err, info) {
                console.log("Doc Loaded!!!!! -------------");
                sheet = info.worksheets[0];
                console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
                step();
            });
        },
        function appendRow(step) {
            console.log("APPENDING ROW!!!! --------------");
            sheet.addRow(bodyData, function(err, info) {
                console.log("callback");
                step();
            });
        },
        function success(step) {
            // Send simple text to the webhook channel
            webhook.send(rawSlack, function(err, res) {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('Message sent');
                }
            });

            res.status(200).send("Success");
            step();
        }
    ], function(err) {
        if (err) {
            console.log('Error: ' + err);
            res.status(500).send("Error");
        }
    });

};
