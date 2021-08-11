const express = require('express');
// const controllers = require('../controllers/login');
const login = express.Router();

login.get('/');

module.exports = login;
