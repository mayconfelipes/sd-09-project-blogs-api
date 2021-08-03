const rescue = require('express-rescue');
const User = require('../services/User');

const create = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const response = await User.create(displayName, email, password, image);

  if (response.err) {
    return next({
      error: {
        statusCode: 409,
        message: response.err.message,
      },
    });
  }

  return res.status(201).json(response);
});

const findAll = rescue(async (_req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

const findByPk = rescue(async (req, res, next) => {
  const { id } = req.params;

  const response = await User.findByPk(id);

  if (response.err) {
    return next({
      error: {
        statusCode: 404,
        message: 'User does not exist',
      },
    });
  }

  return res.status(200).json(response);
});

module.exports = {
  create,
  findAll,
  findByPk,
};
