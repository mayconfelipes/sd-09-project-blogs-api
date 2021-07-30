const express = require('express');

const router = express.Router();

const ControllerUsers = require('../controllers/ControllerUsers');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validUser, ControllerUsers.create);
router.get('/', Middlewares.validJWT, ControllerUsers.getAll);
router.delete('/me', Middlewares.validJWT, ControllerUsers.deleteMe);
router.get('/:id', Middlewares.validJWT, ControllerUsers.getUserById);

module.exports = router;