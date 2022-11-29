const { Router } = require('express');
const Restaurants = require('../models/Restaurants.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurants.getAll();
    res.json(restaurants);
  } catch (e) {
    next(e);
  }
});
