const mapClient = require("@googlemaps/google-maps-services-js").Client;


async function getCity(city) {
    const client = new mapClient({});

    // Await geocode request
    await client
        .geocode({
            params: {
                address: city,
                key: '<API KEY>'
            }
        })
        .then(async r => {
            var data = r.data.results[0];

            console.log(data)
        })
        .then(e => {
            console.log(e)
        });
}


// Get Places for Geocoded City
async function getPlaces(obj) {
    const client = new mapClient({});
    
    // Await Places request
    await client
        .placesNearby({
            params: {
                location: [obj.coords.lat, obj.coords.lng],
                radius: 20000,
                keyword: 'store',
                key: '<API KEY>',
            },
            timeout: 2000 // milliseconds
        })
        .then(async r => {
            var places = r.data.results

            console.log(places)
        })
        .catch(e => {
            console.log(e);
        });
}
