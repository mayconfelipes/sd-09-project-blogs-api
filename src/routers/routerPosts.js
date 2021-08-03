const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, rescue(postsController.create));
router.get('/search', validateJWT, rescue(postsController.getBySearch));
router.get('/:id', validateJWT, rescue(postsController.getById));
router.get('/', validateJWT, rescue(postsController.getAll));
router.put('/:id', validateJWT, rescue(postsController.updateById));
router.delete('/:id', validateJWT, rescue(postsController.deleteById));

module.exports = router; 