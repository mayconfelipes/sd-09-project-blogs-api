const express = require('express');

const router = express.Router();

const { User } = require('../models');
const services = require('../services');

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

  const token = await services.jwtService.jwtSign(existingUser[0].dataValues);
  return res.status(200).json({ token });
});

module.exports = router;
