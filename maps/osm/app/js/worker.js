/*global importScripts supercluster */
importScripts('vendor/supercluster.min.js');

var now = Date.now();
var index;


//// Load GeoJSON
getJSON('../oak_out.geojson', function (geojson) {

    //// Define supercluster
    index = supercluster({
        log: true,
        radius: 50,
        extent: 400,
        maxZoom: 17
    }).load(geojson.features);

    console.log(index.getTile(0, 0, 0));

    postMessage({ready: true}); // Send Message to Index Saying geojson is ready for display

    console.log('loaded ' + geojson.features.length + ' points JSON in ' + ((Date.now() - now) / 1000) + 's');  // Log Point Count
});


//// If Message Received from Index
self.onmessage = function (e) {
    // If Zooming
    if (e.data.getClusterExpansionZoom) {
        postMessage({
            expansionZoom: index.getClusterExpansionZoom(e.data.getClusterExpansionZoom),
            center: e.data.center
        });
    } else if (e.data) {
        postMessage(index.getClusters(e.data.bbox, e.data.zoom));   // Send Updated List of Clusters within Bounding Box and Zoom to Index
    }
};

//// AJAX
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            callback(xhr.response);
        }
    };
    xhr.send();
}
