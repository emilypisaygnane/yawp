const { Router } = require('express');
const authDelete = require('../middleware/authDelete');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review)
        next();
      res.json(review);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, authDelete], async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      res.json(review);

      const authDelete = await Review.delete(req.params.id);
      res.json(authDelete);
    } catch (e) {
      next(e);
    }
  });
