const rescue = require('express-rescue');
const User = require('../services/User');

const create = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const response = await User.create(displayName, email, password, image);

  if (response.error) {
    return next({
      message: response.error.message,
      code: 409,
    });
  }
});

module.exports = {
  create,
};
