const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middlewares/validateJWT');
const { validateForm } = require('../middlewares/validateForm');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/user', validateForm, rescue(usersController.createUser));
router.get('/user', validateJWT, rescue(usersController.getUsersAll));
router.get('/user/:id', validateJWT, rescue(usersController.getUserById));

module.exports = router; 