module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('You can only delete your own post');
    
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
  
