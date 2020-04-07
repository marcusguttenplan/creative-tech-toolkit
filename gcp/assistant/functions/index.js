// functions/index.js
const functions = require('firebase-functions');
const {
    dialogflow,
    HtmlResponse,
    Permission,
    actionssdk,
    Image,
    Table,
    Carousel,
    BasicCard,
    TransactionRequirements,
    TransactionDecision,
    OrderUpdate,
} = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = dialogflow({
  debug: true
});

app.intent('Default Welcome Intent', (conv) => {
    conv.ask("Howdy Howdy")
    conv.ask(new HtmlResponse({
        url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
    }));
});

// Placeholder based on DialogFlow Entities
app.intent('Get Score', (conv) => {
    console.log('Get Score')

    conv.ask(`Player 1 currently has ${conv.data.score.player_1}, Player 2 currently has ${conv.data.score.player_2}`);

    conv.ask(new HtmlResponse({
        url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
    }));
});

// Fallbacks
app.catch((conv, error) => {
    conv.ask(`Oops! I'm having some issues. Can you please try again?`);
    conv.ask(new HtmlResponse({
        url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
    }));
    console.log(error)
});

app.fallback((conv) => {
    conv.ask(`Oops! I missed that. Can you please try again?`);
    conv.ask(new HtmlResponse({
        url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
    }));
});

exports.fulfillment = functions.https.onRequest(app);
