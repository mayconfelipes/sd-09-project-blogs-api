const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { body: { email } } = req;
  try {
    const result = await User.findOne({ where: { email } });
    if (result) {
      return next({
        statusCode: 409,
        message: 'User already registered',
      });
    }
    return next();
  } catch (e) {
    return next(e);
  }
};
