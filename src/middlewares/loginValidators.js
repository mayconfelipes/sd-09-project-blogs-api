const validator = require('validator');
const { User } = require('../models');

const error = (status, message) => ({ status, message });

const validateEmail = (email) => {
  if (email === undefined) throw error(400, '"email" is required');
  if (validator.isEmpty(email)) throw error(400, '"email" is not allowed to be empty');
};

const validatePassword = (password) => {
  if (password === undefined) throw error(400, '"password" is required');
  if (validator.isEmpty(password)) throw error(400, '"password" is not allowed to be empty');
};

const validateUser = async (email, password) => {
  const exists = await User.findOne({ where: { email, password } });
  if (!exists) throw error(400, 'Invalid fields');
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    validateEmail(email);
    validatePassword(password);
    await validateUser(email, password);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  validateLogin,
};
