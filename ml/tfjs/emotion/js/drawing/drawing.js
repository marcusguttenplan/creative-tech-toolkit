// Global Resize Helper
function resizeCanvasAndResults(dimensions, canvas, results) {
    const {
        width,
        height
    } = dimensions instanceof HTMLVideoElement
        ?
        faceapi.getMediaDimensions(dimensions) :
        dimensions

    canvas.width = width
    canvas.height = height

    // resize detections (and landmarks) in case displayed image is smaller than original size
    return results.map(res => res.forSize(width, height))
}


// Crop and Append canvas Testing Helper
function clip(dimensions, canvas, faceObject, withBoxes) {
    var len = faceObject.length;

    $('#test canvas').remove();
    $.each(faceObject, function(id, val) {
        $('#test').append('<canvas id="face_' + id + '"></div>');
    })
    for (var i = 0; i < len; i++) {
        $('#face_' + i).replaceWith(faceObject[i].extractedFace);
    }
}


// // Dumb Timer Helper Functions
// var counter = 0;
// function startTimer() {
//     counter += 1;
//     // console.log("timer starter", counter);
// }
// function stopTimer() {
//     // console.log("TIMER STOP");
//     return;
// }


// Iterate over results of detectAllFaces() and Pass to drawCanvas()
async function drawLandmarks(dimensions, canvas, results, withBoxes) {

    // Draw canvas after promise resolved
    const outputResults = await output(dimensions, canvas, results).then(function(out) {
        // console.log("output results", out[0]);
        // clip(dimensions, canvas, out, withBoxes);    // Crop a canvas and append to index.html for testing
        // getEmotions(dimensions, canvas, out, withBoxes);     // Out of band classification for testing
        drawCanvas(dimensions, canvas, out, withBoxes);
    });


    // drawCanvas(dimensions, canvas, out, withBoxes);

}


// Create a Useful output with Face + Emotion data
async function output(dimensions, canvas, results) {
    var faces = [];
    var len = results[0].length; // Cache Array Length for Performance

    // Check for multiple vals in results before iterating
    for (var i = 0; i < len; i++) {
        var faceObj = {};

        const resizer = resizeCanvasAndResults(dimensions, canvas, [results[0][i]]);

        // Construct object to pass
        faceObj.resizedResults = resizer;
        faceObj.faceLandmarks = faceObj.resizedResults.map(det => det.landmarks);
        faceObj.boxedLandmarks = faceObj.resizedResults.map(det => det.detection);
        faceObj.extractedFace = await extraction(dimensions, faceObj);

        // Store objects
        faces.push(faceObj);
    }
    await getEmotions(dimensions, canvas, faces, withBoxes);
    return faces;
}




// Crop faces from canvas using bounding boxes
async function extraction(dimensions, faceObj) {
    var dims = faceObj.boxedLandmarks;
    var dimbox = dims[0].box
    const region = [
        new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width)
    ]
    const facesOut = await faceapi.extractFaces(dimensions, region)
    return facesOut;
}


// Emotion Wrapper
async function getEmotions(dimensions, canvas, results, withBoxes) {
    await analyzeFaces(dimensions, canvas, results, withBoxes, emotionModel);   // Await actual classification of faces
}


// Classify emotion on faces
async function analyzeFaces(dimensions, canvas, results, withBoxes, emotionModel) {
    await Promise.all(
        results.map(async result => result.emotions = await emotionModel.classify(result.extractedFace[0]))
    )
    return results;
}







// Draw results of detectAllFaces()
async function drawCanvas(dimensions, canvas, faceObject, withBoxes) {

    const drawStart = await function(faceObject) {
        var len = faceObject.length;

        const drawLandmarksOptions = {
            lineWidth: 2,
            drawLines: true,
            color: 'green'
        }

        for (var i = 0; i < len; i++) {
            var dimbox = faceObject[i].boxedLandmarks[0].box    // Get bounding box dims
            var emoji = faceObject[i].emotions[0].label.emoji   // Get Number 1 Emoji

            // Draw custom detection boxes with emoji
            const boxesWithText = [
                new faceapi.BoxWithText(new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width), emoji)
            ];

            // Draw to Canvas
            faceapi.drawDetection(canvas, boxesWithText);
            if (withBoxes) {
                faceapi.drawDetection(canvas, boxesWithText);
            }
        }
    }
    drawStart(faceObject);
}

// Draw initial findings TODO fix
function drawDetections(dimensions, canvas, detections) {
    if (detections[0].length >= 1) {
        const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections[0])
        // faceapi.drawDetection(canvas, resizedDetections)

        var dimbox = resizedDetections[0].box
        // console.log(dimbox.x, dimbox.y, dimbox.height, dimbox.width);
        const boxesWithText = [
            new faceapi.BoxWithText(new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width), "custom string") // Pass custom strings here
        ];
        faceapi.drawDetection(canvas, boxesWithText);

    } else {
        // console.log("nulled");
    }
}
