var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '...',
    maxZoom: 18
  }
);

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": false,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'no2'
};

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('map', {
  center: new L.LatLng(37.77241,-122.169031),
  zoom: 13,
  layers: [baseLayer, heatmapLayer]
});

var heatmapObj = {
    max: 8,
    data : []
}

function geoJson2heat(geojson) {
  return geojson.features.map(function(feature) {
      var tempObj = {}
      tempObj.lat = feature.geometry.coordinates[1];
      tempObj.lng = feature.geometry.coordinates[0];
      tempObj.no2 = feature.geometry.coordinates[2];
    // return [
    //   feature.geometry.coordinates[1],
    //   feature.geometry.coordinates[0],
    //   // feature.properties[intensity]
    //   feature.geometry.coordinates[2]
    // ];
    heatmapObj.data.push(tempObj)
  });
}

var get_it_out = geoJson2heat(loadData);

console.log(heatmapObj.data[0]);

heatmapLayer.setData(heatmapObj);
// console.log(loadData.features[0]);
