const rescue = require('express-rescue');
const User = require('../services/User');

const create = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const response = await User.create(displayName, email, password, image);

  if (response.err) {
    return next({
      error: {
        message: response.err.message,
        statusCode: 409,
      },
    });
  }

  return res.status(201).json(response);
});

const findAll = rescue(async (_req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

module.exports = {
  create,
  findAll,
};
