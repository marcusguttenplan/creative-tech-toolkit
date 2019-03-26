// const GoogleSpreadsheet = require('google-spreadsheet');
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

exports.slacker = (req, res) => {
    console.log("Function Fired!");
    console.log("___________________________________");

    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method == 'OPTIONS') {
        res.status(204).send('');
    }




    // var doc = new GoogleSpreadsheet('1dcGBfS8VC0X16sqqXjC2Twgd4L3aFrMHKvIKlFwAK4Q');
    // var sheet;
    var bodyData = {}

    function parseBody(data) {
        console.log(data, data.id);
        if (data.id) {
            rawSlack.attachments[0].pretext = "Call received from " + data.id;
            rawSlack.attachments[0].fallback = "Call received from " + data.id;

            var push = {
                "title": "Name",
                "value": data.id,
                "short": false
            }
            rawSlack.attachments[0].fields.push(push);
            var push = {}

        }
        if (data.ip_addrs) {

            for(var i in data.ip_addrs) {
                var push = {
                    "title": "IP",
                    "value": data.ip_addrs[i].ip_addr,
                    "short": false
                }
                rawSlack.attachments[0].fields.push(push);
                var push = {}
            }


        }
        console.log("parsed", data);
    }

    async.series([
        function parse(step) {
            parseBody(req.body);
            step();
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
