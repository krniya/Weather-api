const request = require('request');

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city)+'.json?access_token=pk.eyJ1Ijoia3JuaXlhIiwiYSI6ImNraXU1YnB5eTJpamMyd3AzbDl0b2Q4ZGgifQ.F8b84LyU7OgG6WlpkbnExw&limit=1'

    request({url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect with Location services!", undefined)
        }
        else if(response.body.features.length === 0) {
            callback("Unable to find the location! Please search again!", undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode