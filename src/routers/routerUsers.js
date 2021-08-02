const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', rescue(userController.create));
router.get('/', validateJWT, rescue(userController.getAll));
router.get('/:id', validateJWT, rescue(userController.getById));
router.delete('/me', validateJWT, rescue(userController.deleteMe));

module.exports = router; 