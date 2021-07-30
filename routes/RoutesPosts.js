const express = require('express');

const router = express.Router();

const ControllerPosts = require('../controllers/ControllerPosts');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validJWT, Middlewares.validPost, ControllerPosts.create);
router.get('/', Middlewares.validJWT, ControllerPosts.getAll);

module.exports = router;