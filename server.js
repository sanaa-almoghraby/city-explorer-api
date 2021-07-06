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

class WEather {
    constructor(weather) {
        this.description = weather.weather.description,
            this.data = weather.valid_date,
            this.high_temp = weather.high_temp,
            this.low_temp = weather.low_temp
    }
}
try {
    // localhost:3001/getCityInfo?cityy=Amman
    server.get('/getCityInfo', handlerWeather);
    function handlerWeather(req, res) {

        let cityy = req.query.cityy
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityy}&key=${process.env.WEATHER_API_KEY}`
        axios.get(url).then(weatherData => {
            // console.log(weatherData);
            let newData = weatherData.data.data.map(element => {
                console.log(element);
                // res.send(element)
                return new WEather(element);
            })
            res.send(newData)
        })
    }

} catch {
    res.status(500).send('incorect name')
}

// ========================================================================

try {

    // localhost:3001/moviedata?movieName=Amman
    server.get('/moviedata', handlerMovie);
    function handlerMovie(req, res) {

        let movieName = req.query.movieName
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`
        axios.get(url).then(movieData => {

            let newDatamovi = movieData.data.results.map(element => {
                return new Movie(element);
            })
            res.send(newDatamovi)
        })
    }

}
catch {
    res.status(500).send('Internal Server Error')
}

class Movie {
    constructor(movies) {
        this.title = movies.title;
        this.overview = movies.overview;
        this.vote_average = movies.vote_average;
        this.vote_count = movies.vote_count;
        this.poster_path = movies.poster_path;
        this.popularity = movies.popularity;
        this.release_date = movies.release_date;

    }
}






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