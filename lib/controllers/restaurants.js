const { Router } = require('express');
const Restaurants = require('../models/Restaurants.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurants.getById(req.params.id);
      await restaurant.addReviews();
      res.json(restaurant);
    } catch (e) {
      next (e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurants.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  });
