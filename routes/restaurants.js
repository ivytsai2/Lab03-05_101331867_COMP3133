const express = require('express');
const RestaurantModel = require('../models/Restaurants');
const restaurantRoutes = express.Router();

//get all restaurant list details
//http://localhost:3000/restaurants
restaurantRoutes.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.status(200).send(restaurants)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//filter restaurant list details by cuisine type
//http://localhost:3000/restaurants/cuisine/Japanese
//http://localhost:3000/restaurants/cuisine/Bakery
//http://localhost:3000/restaurants/cuisine/Italian
restaurantRoutes.get('/restaurants/cuisine/:type', async (req, res) => {
    const type = req.params.type;
    try {
        const restaurants = await RestaurantModel.find({cuisine: type});
        res.status(200).send(restaurants);
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//get all restaurant list details
//sort by restaurant_id in ascending or descending order based on param
//http://localhost:3000/restaurants?sortBy=ASC
//http://localhost:3000/restaurants?sortBy=DESC
restaurantRoutes.get('/restaurants', async (req, res) => {
    const sort_by = req.query.sortBy;
    try {
        if (sort_by == "ASC") {
            res.status(200).send(await RestaurantModel.find().sort({"restaurant_id":1}))
        } else if (sort_by == "DESC"){
            res.status(200).send(await RestaurantModel.find().sort({"restaurant_id":-1}))
        } else {
            res.status(200).send(await RestaurantModel.find())
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//get all restaurant list details 
//where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
//selected columns must include cuisines, name and city, but exclude id
//sorting order must be Ascending Order on the name
//http://localhost:3000/restaurants/Delicatessen
restaurantRoutes.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find(
            {
                cuisine: "Delicatessen", 
                city: {$ne:"Brooklyn"}
            }, 
            {
                cuisine: 1,
                name: 1,
                city: 1,
                _id: 0
            }).sort({"name":1});
        res.status(200).send(restaurants);
    } catch (e) {
        res.status(400).send(e.message)
    }
})
module.exports = restaurantRoutes