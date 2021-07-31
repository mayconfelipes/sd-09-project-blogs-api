const rescue = require('express-rescue');

const { User } = require('../models');

const emailExists = rescue(async (req, res, next) => {
  const { email } = req.body;
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) req.email = true;
  else req.email = false;

  return next();
});

module.exports = emailExists;
