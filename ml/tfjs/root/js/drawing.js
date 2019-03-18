function resizeCanvasAndResults(dimensions, canvas, results) {
  const { width, height } = dimensions instanceof HTMLVideoElement
    ? faceapi.getMediaDimensions(dimensions)
    : dimensions

  // console.log("resize", width, height);
  canvas.width = width
  canvas.height = height

  // resize detections (and landmarks) in case displayed image is smaller than
  // original size

  return results.map(res => res.forSize(width, height))
  // results.map(res => console.log(res.forSize(width, height)));
  // console.log(results.map(res => res));
  // console.log(results[0].forSize(width, height))
}

function drawDetections(dimensions, canvas, detections) {
    // console.log(dimensions, canvas, detections);
    // if (detections[0].length >= 1) {
    //     console.log("detections", detections);
    //     const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections)
    // } else {
    //     console.log("nulled");
    // }
  const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections)
  // if (resizedDetections) {
  //     faceapi.drawDetection(canvas, resizedDetections);
  // }
  faceapi.drawDetection(canvas, resizedDetections)
}

function drawLandmarks(dimensions, canvas, results, withBoxes = true) {

  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)
  // console.log("draw landmarks", resizedResults);

  if (withBoxes) {
      boxedLandmarks = resizedResults.map(det => det.detection)
      if (boxedLandmarks[0] === 'undefined') {
          // faceapi.drawDetection(canvas, boxedLandmarks);
      } else {
          faceapi.drawDetection(canvas, boxedLandmarks);
          // console.log("missed it")
          // console.log("boxed landmarks", boxedLandmarks);
      }

    // faceapi.drawDetection(canvas, boxedLandmarks);
  }

  const faceLandmarks = resizedResults.map(det => det.landmarks)
  const drawLandmarksOptions = {
    lineWidth: 2,
    drawLines: true,
    color: 'green'
  }


  if (faceLandmarks[0] === 'undefined') {
      // faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
  } else {
      faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
      // console.log("missed it")
      // console.log("face landmarks", faceLandmarks)
  }
  // faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
}
