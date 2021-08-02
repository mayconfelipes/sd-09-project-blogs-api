const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const httpStatusCode200 = 200;
const httpStatusCode400 = 400;

const JwtSecret = 'secret';
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email },
      JwtSecret, jwtConfig);

    return res.status(httpStatusCode200).json({ token });
  } catch (error) {
    res.status(httpStatusCode400).json({ message: 'Invalid fields' });
  }
});

module.exports = router;
