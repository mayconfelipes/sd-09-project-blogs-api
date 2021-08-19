const express = require('express');

const router = express.Router();

const { User } = require('../models');
const services = require('../services');

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

  const signJWT = await services.jwtService.jwtSign(req.body);

  await User.create(validate);

  return res.status(201).json({ signJWT });
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) {
    return res.status(401).json({ message: jwtValidation.message });
  }

  const users = await User.findAll({});
  return res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) {
    return res.status(401).json({ message: jwtValidation.message });
  }

  const users = await User.findAll({ where: { id: req.params.id } });
  if (users.length === 0) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(users[0]);
});

module.exports = router;
