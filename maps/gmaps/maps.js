const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_KEY,
    Promise: Promise
});

// LatLng to Address
async function getAddress(coordinates) {
    console.log("getAddress()");

    return await googleMapsClient.reverseGeocode({
            latlng: [coordinates.latitude, coordinates.longitude]
        }).asPromise()
        .then((response) => {
            var addy = response.json.results[0].formatted_address
            return addy
        })
        .catch((err) => {
            console.log(err);
        });
}



// Geolocate and Get Closest Store
async function getClosest(coordinates) {
    console.log("getClosest()");

    return await googleMapsClient.placesNearby({
            location: `${coordinates.latitude},${coordinates.longitude}`,
            radius: 50000,
            keyword: "discounttire.com",
            name: "Discount Tire",
            type: "car_repair"
        }).asPromise()
        .then(async (response) => {
            var results = response.json.results;

            // console.log(results)
            console.log(JSON.stringify(results))

            // TODO: add filter
            for (var i = 0; i < results.length; i++) {}
        })
        .catch((err) => {
            console.log("err");
        });
}



// Get Places API Details for Closest Store
async function getDetails(storeObj) {
    console.log("getDetails()");

    var place_id = storeObj.reference;
    var coordinates = storeObj.location;

    return await googleMapsClient.place({
            placeid: place_id
        }).asPromise()
        .then(async (response) => {
            var result = response.json.result;
            console.log(result);
            return result;
        })
        .catch((err) => {
            console.log("err");
        });
}
