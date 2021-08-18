require('dotenv').config();
const express = require('express');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const { login } = require('../services');

const { JWT_SECRET } = process.env;

const router = express.Router();

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
});

const tokenGenerator = (payload) => {
  const jwtConfig = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, JWT_SECRET, jwtConfig);
};

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = schema.validate({ email, password });

  if (error) return next(error);

  const user = await login({ email, password });

  if (user.message) return next(user);

  const token = tokenGenerator({ email });

  res.status(200).json({ token });
});

module.exports = router;
