'use strict';
const axios = require('axios')
const weatherfun = {};
const memoryInf = {};
class WEather {
    constructor(weather) {
        this.description = weather.weather.description,
            this.data = weather.valid_date,
            this.high_temp = weather.high_temp,
            this.low_temp = weather.low_temp
    }
}

// localhost:3001/getCityInfo?cityy=Amman
try {
    weatherfun.handlerWeather = function (req, res) {

        let cityy = req.query.cityy

        // {https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=fd6bea7905ba432fad1c2cd73201c929}
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityy}&key=${process.env.WEATHER_API_KEY}`
        if (memoryInf[cityy] !== undefined) {
            res.send(memoryInf[cityy])
            console.log('sssssssss');

        } else {


            axios.get(url).then(weatherData => {
                // console.log(weatherData);
                let newData = weatherData.data.data.map(element => {
                    // console.log(element);
                    // res.send(element)
                    return new WEather(element);
                })
                memoryInf[cityy]=newData;
                res.send(newData)
                console.log('from api');
            })
        }
    }

} catch {
    res.status(500).send('incorect name')
}



module.exports = weatherfun;