const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const userAuth = require('../middleware/userAuth');
const Review = require('../models/Review');

module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const reviews = await Review.getById(req.params.id);
      if (!reviews) {
        res.status(404);
        res.send();
      }
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, userAuth], async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });
