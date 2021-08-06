const express = require('express');
const { createUser } = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post('/', createUser);

module.exports = userRoute;
