const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
                latitude +
                "&lon=" +
                longitude +
                "&appid=d4ca7075433bea82e251ad1a827fda6d";
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Can\'t connect to the server!', undefined)
        }
        else if (response.body.error) {
            callback('Incorrect data inserted!', undefined)
        }
        else {
            callback(undefined, {
                temperature: parseInt(response.body.main.temp)
            })
        }
    })
}

module.exports = forecast;