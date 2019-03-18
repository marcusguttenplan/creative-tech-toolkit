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






function drawDetections(dimensions, canvas, detections) {
    // if (detections[0].length >= 1) {
    //     const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections[0])
    //     // faceapi.drawDetection(canvas, resizedDetections)
    //
    //     var dimbox = resizedDetections[0].box
    //     // console.log(dimbox.x, dimbox.y, dimbox.height, dimbox.width);
    //     const boxesWithText = [
    //         new faceapi.BoxWithText(new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width), "uh oh")
    //     ];
    //     faceapi.drawDetection(canvas, boxesWithText);
    //
    // } else {
    //     // console.log("nulled");
    // }
}




async function extraction(dimensions, faceObj) {
    // const input = await faceapi.toNetInput(false, true)
    var dims = faceObj.boxedLandmarks;
    var dimbox = dims[0].box
    // console.log(dimbox.x, dimbox.y, dimbox.height, dimbox.width);
    const region = [
        new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width)
    ]
    const facesOut = await faceapi.extractFaces(dimensions, region)
    // const { detections, faces } = facesOut;
    // console.log(facesOut);
    // .then((result) => {
    //     return result
    // });
    return facesOut;
}





async function output(dimensions, canvas, results) {
    var faces = [];
    var len = results[0].length; // Cache Array Length for Performance

    // Check for multiple vals in results before iterating
    for (var i = 0; i < len; i++) {
        var faceObj = {};

        const resizer = resizeCanvasAndResults(dimensions, canvas, [results[0][i]]);
        faceObj.resizedResults = resizer;
        faceObj.faceLandmarks = faceObj.resizedResults.map(det => det.landmarks);
        faceObj.boxedLandmarks = faceObj.resizedResults.map(det => det.detection);

        faceObj.extractedFace = await extraction(dimensions, faceObj);

        if (withBoxes) {}


        faces.push(faceObj);
    }

    await getEmotions(dimensions, canvas, faces, withBoxes);
    // console.log(faces);
    return faces;
}





// Iterate over results of detectAllFaces() and Pass to drawCanvas()
async function drawLandmarks(dimensions, canvas, results, withBoxes) {



    const outputResults = await output(dimensions, canvas, results).then(function(out) {
        // console.log(out[0]);
        // clip(dimensions, canvas, out, withBoxes);
        // getEmotions(dimensions, canvas, out, withBoxes);
        drawCanvas(dimensions, canvas, out, withBoxes);
    });


    // drawCanvas(dimensions, canvas, out, withBoxes);

}



async function getEmotions(dimensions, canvas, results, withBoxes) {

    // console.log(emotionModel);
    await analyzeFaces(dimensions, canvas, results, withBoxes, emotionModel);
    // clip(dimensions, canvas, results, withBoxes);
}



async function analyzeFaces(dimensions, canvas, results, withBoxes, emotionModel) {

    await Promise.all(
        // results.map(async result => await emotionModel.classify(result.extractedFace[0]))
        results.map(async result => result.emotions = await emotionModel.classify(result.extractedFace[0]))
    )

    // let emotions = await Promise.all(
    //     // results.map(async result => await emotionModel.classify(result.extractedFace[0]))
    //     results.map(async result => await emotionModel.classify(result.extractedFace[0]))
    // )

    // let outputObj = [];


    // emotions.push(results.map(async result => await emotionModel.classify(result.extractedFace[0])));
    // results.map(async result => console.log(result.extractedFace));
    // console.log(JSON.stringify(emotions[0]));
    // console.log(results);


    return results;
}



function clip(dimensions, canvas, faceObject, withBoxes) {
    var len = faceObject.length;

    $('#test canvas').remove();
    // $('body').append("<div id='test'></div>");

    $.each(faceObject, function(id, val) {
        $('#test').append('<canvas id="face_' + id + '"></div>');
    })

    for (var i = 0; i < len; i++) {
        // console.log(faceObject[i].extractedFace);
        $('#face_' + i).replaceWith(faceObject[i].extractedFace);
    }


}




// Draw results of detectAllFaces()
async function drawCanvas(dimensions, canvas, faceObject, withBoxes) {
    const drawStart = await
    function(faceObject) {
        var len = faceObject.length;

        const drawLandmarksOptions = {
            lineWidth: 2,
            drawLines: true,
            color: 'green'
        }

        for (var i = 0; i < len; i++) {
            var dimbox = faceObject[i].boxedLandmarks[0].box
            var emoji = faceObject[i].emotions[0].label.emoji

            // console.log(faceObject[i]);
            // console.log(dimbox);

            const boxesWithText = [
                new faceapi.BoxWithText(new faceapi.Rect(dimbox.x, dimbox.y, dimbox.height, dimbox.width), emoji)
            ];

            faceapi.drawDetection(canvas, boxesWithText);

            if (withBoxes) {
                faceapi.drawDetection(canvas, boxesWithText);
            }
            // faceapi.drawLandmarks(canvas, faceObject[i].faceLandmarks, drawLandmarksOptions)
        }
    }

    drawStart(faceObject);
    // getEmotion(dimensions, canvas, faceObject, withBoxes);
}
