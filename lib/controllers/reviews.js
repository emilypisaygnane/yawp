const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const userAuth = require('../middleware/userAuth');
const Review = require('../models/Review');

module.exports = Router()
  .delete('/:id', [authenticate, userAuth], async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next (e);
    }
  });
