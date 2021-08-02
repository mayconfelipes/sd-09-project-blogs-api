const express = require('express');
const { User } = require('../models');

const router = express.Router();
const httpStatusCode201 = 201;
const httphttpStatusCode500 = 500;
const httpStatusCode409 = 409;

router.post('/', async (req, res) => {
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