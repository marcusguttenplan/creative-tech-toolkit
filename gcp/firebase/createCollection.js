const admin = require('firebase-admin');
const async = require('async');
const fs = require('fs');

console.log("Starting Firebase Importer");

const creds = require('./mguttenplan-creds.json');

//// Firestore init
admin.initializeApp({
    credential: admin.credential.cert(creds),
    databaseURL: "https://anchordemo.firebaseio.com/"
});
var db = admin.firestore();
var ref = db.collection('inventory');

function createDocs(data) {
    var input = data;
    // newObj = {};
    // newObj.id = input[i].id;
    for (i = 1; i < input.length; i++) {
        let setter = ref.doc(input[i].id).set(newObj).catch(err => console.log(err))
        let parent = ref.doc(input[i].id).collection('items');
    }
}


function createSubs(data) {
    var input = data;

    for (i = 1; i < input.length; i++) {
        for (j = 0; j < input[i].items.length; j++) {

            let item = JSON.parse(JSON.stringify(input[i].items[j]));
            // setTimeout(callTimeout, 100 * i, item);

            let subdoc = ref.doc(input[i].id).collection('items').doc(JSON.stringify(item.product_id)).set(item).catch(err => console.log(err));
        }
    }
}


//// execute functions in series, step() to next
function generator() {
    async.series([
        function firebase(step) {
            createDocs(inputOg);
            step();
        },
        function success(step) {
            createSubs(inputOg);
            step();
        }
    ], function(err) {
        if (err) {
            console.log('Error: ' + err);
        }
    });
}

//// Kickoff Generator
generator();
