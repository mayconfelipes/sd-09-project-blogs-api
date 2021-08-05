const express = require('express');
const { validateForm } = require('../middlewares/validateForm');
const validateToken = require('../middlewares/validateToken');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/user', validateForm, usersController.createUser);
router.get('/user', validateToken, usersController.getUsersAll);
router.get('/user/:id', validateToken, usersController.getUserById);
router.delete('/user/me', validateToken, usersController.deleteUser);

module.exports = router;