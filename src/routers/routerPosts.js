const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, rescue(postsController.create));
router.get('/', validateJWT, rescue(postsController.getAll));
router.get('/:id', validateJWT, rescue(postsController.getById));
router.put('/:id', validateJWT, rescue(postsController.updateById));

module.exports = router; 