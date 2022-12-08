const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Restaurants = require('../models/Restaurants.js');
const { Review } = require('../models/Review.js');

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
  })

  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insert({
        restaurant_id: req.params.id,
        userId: req.user.id,
        stars: req.body.stars,
        detail: req.body.detail,
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
