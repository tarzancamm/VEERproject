// Imports
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const { seed, getCountries, submitAdventure, getAdventure, deleteAdventure, registerUser } = require('./controller')

// Middleware
app.use(express.json())
app.use(cors())


// Seed database
app.post('/seed', seed)


// Endpoints connecting HTML, CSS and JS
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))
app.get('/style', (req, res) => res.sendFile(path.join(__dirname, '../client/style.css')))
app.get('/js', (req, res) => res.sendFile(path.join(__dirname, '../client/index.js')))
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../client/login.html')))
app.get('/login/style', (req, res) => res.sendFile(path.join(__dirname, '../client/login.css')))
app.get('/login/js', (req, res) => res.sendFile(path.join(__dirname, '../client/login.js')))
app.get('/add-adventure', (req, res) => res.sendFile(path.join(__dirname, '../client/add-adventure.html')))
app.get('/adventure/style', (req, res) => res.sendFile(path.join(__dirname, '../client/add-adventure.css')))
app.get('/adventure/js', (req, res) => res.sendFile(path.join(__dirname, '../client/add-adventure.js')))


// Endpoints connecting images
app.get('/image-one', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/netherlands.png")))
app.get('/image-two', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/spain.png")))
app.get('/image-three', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/england.png")))
app.get('/image-four', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/indonesia.png")))
app.get('/image-five', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/france.png")))
app.get('/image-six', (req, res) => res.sendFile(path.join(__dirname, "../client/style_resources/italy.png")))


// Endpoints functionality
app.get('/countries', getCountries)
app.delete('/countries/:adventureid', deleteAdventure)
app.post('/adventures', submitAdventure)
app.get('/adventures/:countryid', getAdventure)
app.post('/register', registerUser)
// app.post('/login', loginUser)


// Runs server
const {PORT} = process.env || 6996

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
