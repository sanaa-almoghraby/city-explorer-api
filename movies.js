'use strict';
const axios = require('axios')
const moviesfun={};
try {

    // localhost:3001/moviedata?movieName=Amman
    moviesfun.handlerMovie=  function (req, res) {

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
module.exports = moviesfun;
