require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { User } = require('../models');
const services = require('../services');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const SECRET = process.env.SECRET || 'secret';

router.post('/', async (req, res) => {
  const validate = await services.login.validateLogin(req.body);
  if (validate.isJoi) {
    return res.status(400).json({
      message: validate.details[0].message,
    });
  }

  const existingUser = await User.findAll({
    where: { email: req.body.email },
  });

  if (existingUser.length === 0) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: req.body }, SECRET, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = router;
