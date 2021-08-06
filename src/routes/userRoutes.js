const express = require('express');
const rescue = require('express-rescue');
const { createUser } = require('../controllers/userController');
const { validateUser } = require('../middlewares/userValidators');

const userRoute = express.Router();

userRoute.post('/', validateUser, rescue(createUser));

module.exports = userRoute;
