const express = require('express');
const postControllers = require('../controllers/postController');

const Route = express.Router();

Route.post('/post', postControllers.createPost);
module.exports = Route;
