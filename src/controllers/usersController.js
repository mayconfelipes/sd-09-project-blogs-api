const express = require('express');
const { User } = require('../models');

const userRoute = express.Router();

userRoute.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => {
      console.log(newUser);
      const { id, displayName, email, image, createdAt, updatedAt } = newUser;

      return res.status(200).json({ id, displayName, email, image, createdAt, updatedAt });
    })
    .catch((error) => res.status(500).json({ message: error }));
});

module.exports = userRoute;