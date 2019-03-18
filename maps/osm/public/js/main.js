/*global L */

var map = L.map('map').setView([37.77241,-122.169031], 13); // Init new Map

// Create Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add Markers to Map
var markers = L.geoJson(null, {
    pointToLayer: createClusterIcon
}).addTo(map);

// Init Worker Script
var worker = new Worker('js/worker.js');
var ready = false;

//// If Message received from Worker
worker.onmessage = function (e) {
    if (e.data.ready) {
        ready = true;
        update(); // Update Map if Ready
    } else if (e.data.expansionZoom) {
        map.flyTo(e.data.center, e.data.expansionZoom); // Re-center if Zooming
    } else {
        markers.clearLayers();  // Clear Markers
        markers.addData(e.data);    // Add new Markers
    }
};

//// Update Map
function update() {
    if (!ready) return;
    var bounds = map.getBounds();
    worker.postMessage({
        bbox: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],   // Send Bounding Box to Worker
        zoom: map.getZoom() // Send Zoom to Worker
    });
}

map.on('moveend', update);


//// Super Cluster
function createClusterIcon(feature, latlng) {
    //// If Not Clustered, Define Marker
    if (!feature.properties.cluster) {
        return L.marker(latlng).bindPopup("<b>"+ feature.properties.name +"</b><br>" + feature.geometry.coordinates[2]);
    }

    var count = feature.properties.point_count; // Count all Points in Each Cluster

    //// Define Cluster Sizing
    var size =
        count < 30 ? 'small' :
        count < 200 ? 'medium' : 'large';

    //// Apply CSS Icon Classes
    var icon = L.divIcon({
        // html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
        className: 'marker-cluster marker-cluster-' + size,
        iconSize: L.point(60, 60)
    });

    return L.marker(latlng, {icon: icon});
}

//// Send Message to Worker if Cluster Click
markers.on('click', function (e) {
    if (e.layer.feature.properties.cluster_id) {
        worker.postMessage({
            getClusterExpansionZoom: e.layer.feature.properties.cluster_id,
            center: e.latlng
        });
    }
});
