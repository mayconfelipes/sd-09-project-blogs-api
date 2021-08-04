const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const postControllers = require('../controllers/postController');

const Route = express.Router();

Route.post('/post', validateJWT,
  postControllers.createPost);
module.exports = Route;
