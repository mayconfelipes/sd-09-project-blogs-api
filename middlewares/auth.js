require('dotenv/config');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const { users } = require('../models');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const secret = process.env.JWT_SECRET;

const getToken = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
const validUser = await users.findUser(email);
if (!validUser || validUser.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign({ validUser }, secret, jwtConfig);
  
  res.status(StatusCodes.OK).json({ token });
};

module.exports = getToken;
