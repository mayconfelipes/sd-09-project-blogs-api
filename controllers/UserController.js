const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SchemaUser } = require('../schemas');

const router = express.Router();
const httpStatusCode200 = 200;
const httpStatusCode201 = 201;
const httphttpStatusCode500 = 500;
const httpStatusCode401 = 401;
const httpStatusCode404 = 404;
const httpStatusCode409 = 409;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpStatusCode401).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    const users = await User.findAll();
    return res.status(httpStatusCode200).json(users);
  });
});

router.get('/:id', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) return res.status(httpStatusCode401).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    const user = await User.findByPk(id);
    if (!user) return res.status(httpStatusCode404).json({ message: 'User does not exist' });
    return res.status(httpStatusCode200).json(user);
  });
});

router.post('/', SchemaUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) {
    return res.status(httpStatusCode409).json({ message: 'User already registered' });
  }

  try {
    const user = await User.create({ displayName, email, password, image });
    return res.status(httpStatusCode201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(httphttpStatusCode500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
