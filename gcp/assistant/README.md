## Google Assistant

With Alexa and Assistant everywhere, designing [Voice Interfaces](https://uxplanet.org/designing-a-vui-voice-user-interface-c0b3b9b57ace?gi=3a57186fd7ce) is all the rage. For many people, using voice to control things is more intuitive than using a screen, and unlocking the capabilities of digital tools with messy hands in the kitchen presents interesting design challenges. After working with Google Assistant for [Discount Tire](https://marcusguttenplan.com/projects/google_nrf_20/), the power that comes from bridging voice control and screen content cannot be ignored.

My friend [Tim Kim](http://www.heytimkim.com/) recently made an offhand joke about how nice it would be to have something to keep score of his ping pong tournaments at work, and it sounded too good to pass up.

The basics of building an Assistant app that works on Google Home, Android, and through the Assistant applications for iOS are:
* An "[Actions]()" project
* [Dialogflow]() conversation elements
* A Google [Cloud Function]() back end
* A [Firebase]() Project


#### Setup

First, create a [Google Cloud Platform](https://console.cloud.google.com) account, walk through the onboarding flow, and get access to some great products and $300 worth of credits. Once that's complete, create a new project, and give it a few seconds to complete. This project will contain all of the resources we'll need, and is a good logical way to group and track things (a lot hard on AWS).

Next, navigate to the [Actions Console](https://console.actions.google.com/), and import the new project to the dashboard here. Once this is imported, choose any category to move on to the setup screen. Use the sidebar on the left to navigate.

Choose an "invokation" name that users can ask to invoke the app. For a ping pong scorekeeper, I'm going to choose "Table Keeper." Continue down the sidebar to "Actions," select "Get Started" and "Build a Custom Intent." This will direct you to login to the [DialogFlow Console](https://dialogflow.cloud.google.com/#/login), where we will scaffold out out conversation.

"Intents" are specific elements of a conversation -- "What time is it?", "Where am I?", "Why am I here?" -- that a user may ask. Thinking in voice interfaces is difficult, and I struggle with this all the time.

For a ping pong game, the basic intents may be something like:
* Stop game
* Start game
* Add Point to Player X
* Remove Point from Player X




#### Scaffolding

The basic idea is that this will consist of DialogFlow and Google Assistant, a Cloud Function to fulfill the conversation, and a front end HTML file to display scores. Firebase will handle the deployment of the function and front end, and the rest can be configured and built online.

The basic project structure will look like this:
```sh
.
├── functions
└── public
```

Install the firebase tools for deploying:
```sh
npm install -g firebase-tools
```

Init and select `functions` and `hosting`:
```sh
firebase init
```

1. Select Language
2. ESLint: N
3. Install dependencies: Y
4. Public dir: `public`
5. Configure as SPA: N


Install the software requirements:
```sh
cd functions && npm install --save firebase-functions actions-on-google dotenv
```

```js
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
```


```
firebase deploy --project {PROJECT_ID}
```

#### Conversation

On the [DialogFlow Dashboard](https://dialogflow.cloud.google.com/#/agent/assistant-scoreboard/intents), start to add intents. The `Default Welcome Intent` and `Default Fallback Intent` will cover hellos and goodbyes.

To handle DialogFlow understanding what a "player" is, we need to create a new entity called `Player`:
[Screenshot of DialogFlow Entities]()

With a `Player` now defined, we need to create the intent for users to add points. Add a new intent, and add training phrases that users may say to add points:
[Screenshot of DialogFlow Intent]()

Ignore `events`, `contexts`, `actions`, and `responses` for now, and finish off by clicking `Enable webhook fulfillment` under Fulfillment.



#### Deploying
