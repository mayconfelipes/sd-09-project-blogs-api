const { Users } = require('../models');

const validateName = (name) => {
  if (name.length < 8) {
    const error = {
      code: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
    throw error;
  }
};

const validateEmail = (email) => {
  const emailRegex = /^\S+@[a-z]+(\.[a-z]{2,3}){1,2}$/g;
  const emailValidation = emailRegex.test(email);
  if (!email) {
    const error = {
      code: 400,
      message: '"email" is required', 
    };
    throw error;
  } else if (!emailValidation) {
    const error = {
      code: 400,
      message: '"email" must be a valid email', 
    };
    throw error;
  }
};

const validatePassword = (password) => {
  if (!password) {
    const error = {
      code: 400,
      message: '"password" is required', 
    };
    throw error;
  } else if (password.length !== 6) {
    const error = {
      code: 400,
      message: '"password" length must be 6 characters long', 
    };
    throw error;
  }
};

const validateEmailUniqueness = async (email) => {
  const response = await Users.findOne({ where: { email } });
  if (response) {
    const error = {
      code: 409,
      message: 'User already registered',
    };
    throw error;
  }
};

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    validateName(displayName);
    validateEmail(email);
    validatePassword(password);
    await validateEmailUniqueness(email);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateUser;
