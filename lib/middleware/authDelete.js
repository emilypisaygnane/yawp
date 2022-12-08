const { Review } = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);
    if (
      req.user &&
      (req.user.id === review.userId || req.user.email === 'admin')
    ) {
      next();
    } else {
      throw new Error('Review ID does not match User ID');
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
