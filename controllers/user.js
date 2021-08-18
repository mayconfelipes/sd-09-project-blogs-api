require('dotenv').config();
const express = require('express');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const { user } = require('../services');

const { JWT_SECRET } = process.env;

const router = express.Router();

const schema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string(),
});

const tokenGenerator = (payload) => {
  const jwtConfig = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, JWT_SECRET, jwtConfig);
};

router.post('/', async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = schema.validate({ displayName, email, password, image });

  if (error) return next(error);

  const newUser = await user.addUser({ displayName, email, password, image });

  if (newUser.message) return next(newUser);

  const token = tokenGenerator({ email });

  res.status(201).json({ token });
});

module.exports = router;
