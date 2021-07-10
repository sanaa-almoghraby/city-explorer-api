'use strict';
const axios = require('axios')




    // localhost:3001/yalpInfo?cityOFrestaurant=Amman

    
    function handleryalp(req, res) {

        let yelpREST = axios.create({
            baseURL: "https://api.yelp.com/v3/",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-type": "application/json",
            },
          })
          
          yelpREST(ENDPOINT, { params: { key: value } }).then(({ data }) => {
            // Do something with the data
          })
          


        let cityOFrestaurant = req.query.cityOFrestaurant;
        

        let url = {
            baseURL: "https://api.yelp.com/v3/",
            headers: {
                Authorization: `Bearer ${process.env.YALP_API_KEY}`,
                "Content-type": "application/json",
            },


        }
        let yelpREST = axios.create(url)
        //============================
        console.log("*****first*****");
        console.log(yelpREST);
        console.log("*****first*****");

        yelpREST("/businesses/search", {
            params: {
              location: cityOFrestaurant,
              term: cityOFrestaurant,
              limit: 10,
            },
          }).then(({ data }) => {
            let dataOfrestaurent = data.businesses.map(dataEl => {
                return new Restaurant(dataEl)
            })
            req.status(200).send(dataOfrestaurent)
            console.log("*****second*****");

            console.log(data);

            console.log("*****second*****");


          })

    }
// } catch {
//     res.status(500).send('Internal Server Error 500 ');

// }

class Restaurant {
    constructor(restaurants) {
      this.name = restaurants.name;
      this.image_url = restaurants.image_url;
      this.price = restaurants.price;
      this.rating = restaurants.rating;
      this.url = restaurants.url;
    }
  }

  module.exports = handleryalp;