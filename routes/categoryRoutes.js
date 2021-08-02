const express = require('express');
const middValidate = require('../middlewares/validateToken');
const categoryControllers = require('../controllers/categoryControllers');

const userRoutes = express.Router();

userRoutes.post('/',
  categoryControllers.validateField,
  middValidate.validateToken,
  categoryControllers.addCategory);

module.exports = userRoutes;