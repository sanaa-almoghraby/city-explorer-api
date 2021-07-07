'use strict';
const express = require('express');
require('dotenv').config();

const cors = require('cors');

// const cityData = require('./Data/weather.json')

const axios = require('axios')
const server = express();
const PORT = process.env.PORT;
// const PORT = 3001;
server.use(cors());

const weathers = require('./weather.js');
const moviemodl=require('./movies.js');
console.log(weathers);
// ========================================================================
server.get('/getCityInfo', weathers.handlerWeather);
server.get('/moviedata',moviemodl.handlerMovie);






server.get('/test', handlerTest);
function handlerTest(request, response) {
    response.status(200).send('my server is working')
}
server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})