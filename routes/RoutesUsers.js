const express = require('express');

const router = express.Router();

const ControllerUsers = require('../controllers/ControllerUsers');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validUser, ControllerUsers.create);
router.get('/', Middlewares.validJWT, ControllerUsers.getAll);

module.exports = router;