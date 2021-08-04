const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const postControllers = require('../controllers/postController');
// const userMiddl = require('../middlewares/usersMiddlewares');

const Route = express.Router();

Route.post('/post', validateJWT,
  postControllers.createPost);

Route.get('/post', validateJWT,
  postControllers.getAll);

Route.get('/post/:id', validateJWT,
  postControllers.getById);
module.exports = Route;
