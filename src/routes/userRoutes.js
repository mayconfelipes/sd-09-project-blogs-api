const express = require('express');
const rescue = require('express-rescue');
const { createUser, getAllUsers, getUserById } = require('../controllers/userControllers');
const { validateUser, userNotExists } = require('../middlewares/userValidators');
const { validateToken } = require('../middlewares/tokenValidators');

const userRoute = express.Router();

userRoute.post('/', validateUser, rescue(createUser));
userRoute.get('/', validateToken, rescue(getAllUsers));
userRoute.get('/:id', validateToken, userNotExists, rescue(getUserById));

module.exports = userRoute;
