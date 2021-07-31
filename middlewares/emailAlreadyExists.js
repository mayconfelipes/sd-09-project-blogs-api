const rescue = require('express-rescue');

const { User } = require('../models');

const { code: CONFLICT } = require('../utils');

const emailAlreadyExists = rescue(async (req, res, next) => {
  const { email } = req.body;
  const existEmail = await User.findOne({ where: { email } });
  if (existEmail) {
    return res.status(CONFLICT).json({ message: 'User already registered' });
  }

  return next();
});

module.exports = emailAlreadyExists;
