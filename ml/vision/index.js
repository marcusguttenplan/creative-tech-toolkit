require('dotenv').config();
const fs = require('fs');
const request = require('request');


//// Express Setup
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
// Cors
app.use(cors());
// Static
// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/ui/dist'));
// Routes
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/ui/dist/index.html')
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on http://localhost:${port}`);



//// CORE SAMPLE OBJECT
var sample = {
    lat: -118.3904615,
    lng: 34.0552741,
    elevation: 0,
    // img: '',
    // streetview: '',
    // timestamp: '',
    // networks: [],
    // labels: [],
    // color: '',
    // properties: [],
    // text: [],
    // logos: [],
    // crop: []
}

//// No PiCamera
async function coreSampler(output) {
    console.log("Core Sampler Started");

    if (!output) {
        var output = 'cat.jpg';
    }

    gmaps(sample.lat, sample.lng, function(results) {
        sample.elevation = results.json.results
    });


    await detectLabels(output).then((results) => {
        for (var i=0; i < results.length; i++) {
            var description = results[i].description
            var score = results[i].score
            console.log(description, score)
        };
    });

    // await detectCropHints(output).then((results) => {
    //     console.log(results);
    // });

    // await detectProperties(output).then((results) => {
    //     console.log(results);
    // });


    // detectText(output).then((results) => {
    //     console.log(results);
    // });
    //
    // detectLogos(output).then((results) => {
    //     console.log(results);
    // });

    // console.log(gmaps(sample.lat, sample.lng));


}


// coreSampler();

capture(function(){
    console.log("Capture Callback");
});

function capture(callback) {
    console.log("Capture Started");
    const PiCamera = require('pi-camera');
    const myCamera = new PiCamera({
        mode: 'photo',
        output: `${ __dirname }/data/output.jpg`,
        width: 640,
        height: 480,
        nopreview: true,
    });

    myCamera.snap()
        .then((result) => {
            console.log("Capture Completed", result);
            var output = './data/output.jpg';
            coreSampler(output);
        })
        .catch((error) => {
            console.log("error", error);
        });
}

//// GOOGLE APIS
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

// G-API Download Streetview Image
async function gmaps(lat, lng, callback) {
    const googleMapsClient = require('@google/maps').createClient({
        key: process.env.GCP_API_KEY
    });

    coords = "" + lng + ',' + lat
    console.log(coords);

    console.log("Map Query Started");
    googleMapsClient.elevation({
        locations: coords
    }, function(err, res) {
        if (err) {
            console.log(err);
        }

        console.log("no error");
        request('https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+coords+'&fov=100&heading=230&pitch=10&key='+process.env.GCP_API_KEY, function(error, response, body) {
            // console.log('error:', error); // Catch error
            // console.log('statusCode:', response && response.statusCode); // Print the response status code of the response
            callback(res)
        }).pipe(fs.createWriteStream('sv.png'));
    });
}

// G-API Detect Faces
async function detectFaces(fileName) {
    const [result] = await client.faceDetection(fileName);
    const faces = result.faceAnnotations;
    console.log('Faces');
    return faces;
}

// G-API Image Classification
async function detectLabels(fileName) {
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    const output = [];
    console.log('Labels:');
    // labels.forEach(label => output.push(label));
    return labels;
}

// G-API Detect Landmarks
async function detectLandmarks(fileName) {
    const [result] = await client.landmarkDetection(fileName);
    const landmarks = result.landmarkAnnotations;
    console.log('Landmarks:');
    // landmarks.forEach(landmark => console.log(landmark));
    return landmarks;
}

// G-API Detect Text
async function detectText(fileName) {
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    // detections.forEach(text => console.log(text));
    return detections;
}

// G-API Detect Logos
async function detectLogos(fileName) {
    const [result] = await client.logoDetection(fileName);
    const logos = result.logoAnnotations;
    console.log('Logos:');
    // logos.forEach(logo => console.log(logo));
    return logos
}

// G-API Detect Colors
async function detectProperties(fileName) {
    const [result] = await client.imageProperties(fileName);
    const colors = result.imagePropertiesAnnotation.dominantColors.colors;
    // colors.forEach(color => console.log(color));
    return result.imagePropertiesAnnotation;
}

// G-API Safe Search
async function detectSafeSearch(fileName) {
    const [result] = await client.safeSearchDetection(fileName);
    const detections = result.safeSearchAnnotation;
    console.log('Safe search:');
    console.log(`Adult: ${detections.adult}`);
    console.log(`Medical: ${detections.medical}`);
    console.log(`Spoof: ${detections.spoof}`);
    console.log(`Violence: ${detections.violence}`);
    console.log(`Racy: ${detections.racy}`);
    return detections;
}


// G-API Crop Suggestions
async function detectCropHints(fileName) {
    const [result] = await client.cropHints(fileName);
    const cropHints = result.cropHintsAnnotation;
    return cropHints;
    cropHints.cropHints.forEach((hintBounds, hintIdx) => {
        console.log(`Crop Hint ${hintIdx}:`);
        hintBounds.boundingPoly.vertices.forEach((bound, boundIdx) => {
            console.log(`  Bound ${boundIdx}: (${bound.x}, ${bound.y})`);
        });
    });
}

// G-API Find on Web
async function detectWeb(fileName) {
    const [result] = await client.webDetection(fileName);
    const webDetection = result.webDetection;
    return webDetection;

    if (webDetection.fullMatchingImages.length) {
        console.log(
            `Full matches found: ${webDetection.fullMatchingImages.length}`
        );
        webDetection.fullMatchingImages.forEach(image => {
            console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
    }

    if (webDetection.partialMatchingImages.length) {
        console.log(
            `Partial matches found: ${webDetection.partialMatchingImages.length}`
        );
        webDetection.partialMatchingImages.forEach(image => {
            console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
    }

    if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach(webEntity => {
            console.log(`  Description: ${webEntity.description}`);
            console.log(`  Score: ${webEntity.score}`);
        });
    }

    if (webDetection.bestGuessLabels.length) {
        console.log(
            `Best guess labels found: ${webDetection.bestGuessLabels.length}`
        );
        webDetection.bestGuessLabels.forEach(label => {
            console.log(`  Label: ${label.label}`);
        });
    }
}

// G-API Geo Landmarks
async function detectWebGeo(fileName) {
    const request = {
        image: {
            source: {
                filename: fileName,
            },
        },
        imageContext: {
            webDetectionParams: {
                includeGeoResults: true,
            },
        },
    };

    const [result] = await client.webDetection(request);
    const webDetection = result.webDetection;
    return webDetection;
    webDetection.webEntities.forEach(entity => {
        console.log(`Score: ${entity.score}`);
        console.log(`Description: ${entity.description}`);
    });
}

// G-API Text Rec
async function detectFulltext(fileName) {
    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
    fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
            console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
                console.log(`Paragraph confidence: ${paragraph.confidence}`);
                paragraph.words.forEach(word => {
                    const wordText = word.symbols.map(s => s.text).join('');
                    console.log(`Word text: ${wordText}`);
                    console.log(`Word confidence: ${word.confidence}`);
                    word.symbols.forEach(symbol => {
                        console.log(`Symbol text: ${symbol.text}`);
                        console.log(`Symbol confidence: ${symbol.confidence}`);
                    });
                });
            });
        });
    });
}




//// SPEAK RESULTS
// const say = require('say');
// var outStr = ""     // For Speaking Output
// function speak(string, cb) {
//     console.log("speaking: ", string);
//     say.speak(string);
//     cb(string);
// }
