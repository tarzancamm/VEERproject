// Imports
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const { seed, getCountries, submitAdventure, getAdventure } = require('./controller')

// Middleware
app.use(express.json())
app.use(cors())

// Seed DB
app.post('/seed', seed)

// Endpoints connecting HTML, CSS and JS



// Endpoints
app.get('/countries', getCountries)
app.post('/adventures', submitAdventure)
app.get('/adventures/:countryid', getAdventure)

// Runs server
const {PORT} = process.env || 6996

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
