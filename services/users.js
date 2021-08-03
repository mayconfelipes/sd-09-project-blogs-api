require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const response = require('../helpers/response');
const validateUser = require('../helpers/validateUser');
const userExists = require('../helpers/userExists');

const SECRET = process.env.JWT_SECRET;

const signIn = async (displayName, email, password, image) => {
  const userValidation = validateUser(displayName, password, email);
  if (userValidation.status !== 200) return response(userValidation.status, userValidation.message);

  const emailValidation = await userExists(email);
  if (emailValidation.status !== 200) {
    return response(emailValidation.status, emailValidation.message);
  }

  try {
    const newUser = await User.create({ displayName, email, password, image });
    if (newUser) {
      const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
      const token = jwt.sign(
        { displayName: newUser.displayName, email: newUser.email }, SECRET, jwtConfig,
      );
      return { status: 201, token };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  signIn,
};