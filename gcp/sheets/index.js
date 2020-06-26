const GoogleSpreadsheet = require('google-spreadsheet');
const admin = require('firebase-admin');
const async = require('async');

console.log("Starting Report Generator");

var doc = new GoogleSpreadsheet('1l6pNV6PYFFoTJ0hLltzTozHc2MCNRixXKiJQ5lXEjlA');
var sheet;
const creds = require('./creds-test.json');
var dataOut = [];



//// Firestore init
admin.initializeApp({
    credential: admin.credential.cert(creds),
    // databaseURL: "https://next19-metrics-prod-230200.firebaseio.com/"
    databaseURL: "https://next19-metrics-test.firebaseio.com/"
});
var db = admin.firestore();
var ref = db.collection('demos');



//// Firestore Query Wrapper
//// await listAll()
async function query(db, ref) {
    console.log("query started");
    return await listAll(ref);
}



//// List All Collections in "demos"
//// await iterateDocs()
async function listAll(ref) {
    console.log("getting collections")

    var demos = await ref.get()
        .then(async docs => {
            await iterateDocs(docs);
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}


//// Iterate over Collection "demos"
//// await getSubCollections()
async function iterateDocs(docs) {
    console.log("getting documents")
    for (var i = 0; i < docs.docs.length; i++) {
        var dataObj = {};
        var id = docs.docs[i].id;
        dataObj.demo = id;

        var subRef = db.collection('demos').doc(id);    // point firestore client to child
        await subRef.getCollections().then(async subCollections => {
            await getSubCollections(subCollections, subRef, dataObj);
        });
    };

}


//// Iterate over Subcollection "sessions"
//// await getSubDocs
async function getSubCollections(subCollections, parent, dataObj) {
    console.log("getting subcollection", subCollections.length)
    for (var i = 0; i < subCollections.length; i++) {
        var collection = subCollections[i];

        var subCollection = parent.collection(collection.id);   // point firestore client to child
        await subCollection.get().then(async subDocs => {
            return await getSubDocs(subDocs, subCollection, dataObj);
        })

    }
}



//// Iterate over Subdocuments in "sessions"
//// await getData()
async function getSubDocs(subDoc, parent, dataObj) {
    console.log("getting subdoc", subDoc.docs.length)
    dataObj.sessions = [];

    for (var i = 0; i < subDoc.docs.length; i++) {
        var sub = subDoc.docs[i];
        dataObj.total = subDoc.docs.length;

        var currDoc = parent.doc(sub.id)    // point firestore client to child
        await getData(currDoc, dataObj);
    }
    dataOut.push(dataObj)   // push data object into global array after contents have been fetched with getData()
}



//// Get values from Subdocuments
//// await firestore get()
async function getData(doc, dataObj) {
    // console.log("getting data", dataObj);
    await doc.get().then(out => {
        var session = {};
        session.id = doc.id;
        session.data = out.data();
        dataObj.sessions.push(session);
        var session = {};
    });
}



//// Analyze firestore object and compute aggregates
//// await firestore query
async function analyze(callback) {
    console.log("querying firestore")
    var data = await query(db, ref);
    console.log("queried!")

    for (var i = 0; i < dataOut.length; i++) {
        var dataObj = dataOut[i];
        var sessions = dataOut[i].sessions;
        console.log("Analyzing Demo:", dataObj.demo,);

        var startCounter = 0;
        var endCounter = 0;

        for (var j = 0; j < sessions.length; j++) {
            var currData = sessions[j].data;

            if (currData.start) {
                startCounter++;
            }
            if (currData.end) {
                endCounter++;
            }
        }

        dataObj.starts = startCounter;
        dataObj.ends = endCounter;

        console.log("starts:", dataObj.starts, "ends:", dataObj.ends, "total:", sessions.length)
    }
    callback(dataObj);
}





//// Sheets integration
//// execute functions in series, step() to next
function generator() {
    async.series([
        function firebase(step) {
            analyze(function(data) {
                // console.log(data);
                step();
            });

        },
        function setAuth(step) {
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
            // for (var j = 0; j < dataOut.length; j++) {
            //     sheet.addRow(dataOut[j], function(err, info) {});
            // }
            step();
        },
        function success(step) {
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
