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
  const validate = await services.user.validateUser(req.body);
  if (validate.isJoi) {
    return res.status(400).json({
      message: validate.details[0].message,
    });
  }

  const existingUser = await User.findAll({
    where: { email: req.body.email },
  });

  if (existingUser.length > 0) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const token = jwt.sign({ data: req.body }, SECRET, jwtConfig);

  await User.create(validate);

  return res.status(201).json({ token });
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = await jwt.verify(token, SECRET);

    const existingUser = await User.findAll({
      where: { email: decoded.data.email },
    });

    if (existingUser.length === 0) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    const users = await User.findAll({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;
