// functions/index.js
const functions = require('firebase-functions');
const {
  dialogflow,
  HtmlResponse
} = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = dialogflow({
  debug: true
});

// TODO: Write your code here.

exports.fulfillment = functions.https.onRequest(app);
