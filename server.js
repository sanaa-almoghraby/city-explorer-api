'use strict';
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const cityData = require('./Data/weather.json')


const server = express();
const PORT = process.env.PORT;
// const PORT = 3001;
server.use(cors());

class WEather{
    constructor(description, data) {
    this.description = description,
        this.data = data

}
}
try {
    //localhost:3001/getCityInfo?cityy=Amman
    server.get('/getCityInfo', (req, res) => {
        console.log(req.query);
        let selectedCity = cityData.find(city => {
            if (city.city_name == req.query.cityy) {
                return city;
            }
        })
        let newData = selectedCity.data.map(element => {
            return new WEather(element.weather.description, element.valid_date);
        })
        res.status(200).send(newData);
    })

} catch {
    res.status(404).send('incorect name')
}



server.get('/test', (request, response) => {
    response.status(200).send('my server is working')
})
server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})