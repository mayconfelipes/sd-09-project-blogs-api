require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');
const response = require('../helpers/response');
const validateUser = require('../helpers/validateUser');
const userExists = require('../helpers/userExists');

const SECRET = process.env.JWT_SECRET;

const signIn = async (displayName, email, password, image) => {
  const userValidation = validateUser(displayName, password, email);
  if (userValidation.status !== 200) {
    return response(userValidation.status, userValidation.message);
  }

  const emailValidation = userExists(email);
  if (emailValidation.status !== 200) {
    return response(emailValidation.status, emailValidation.message);
  }

  BlogPosts.create({ displayName, email, password, image })
    .then((newUser) => {
      const { displayName, email } = newUser;
      const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
      const payload = {
        displayName,
        email,
      };
      const token = jwt.sign(payload, SECRET, jwtConfig);
      return {
        status: 200,
        token,
      }
    })
    .catch((err) => {
      return { status: 500, message: err.message }
    });
  return {
    status,
    user,
  };
};

module.exports = {
  signIn,
};