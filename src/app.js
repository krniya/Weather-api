const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()

// Define path for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'NiYa',
    })
})

app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About Me',
        name: 'NiYa',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'NiYa',
        title: 'Helps',
        message: 'No help for you'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {temperature} = {}) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                Location: req.query.address,
                Temperature: (parseInt(temperature) - 273) +" Deg Cal",
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404help', {
        name: 'NiYa',
        title: 'Error 404',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'NiYa',
        title: 'Error 404'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000!")
})