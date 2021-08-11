const express = require('express');
// const controllers = require('../controllers/categories');
const categories = express.Router();

categories.get('/');

module.exports = categories;
