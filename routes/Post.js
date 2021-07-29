const express = require('express');
const PostControllers = require('../controllers/Post');
const validate = require('../middlewares/jwtValidation');

const router = express.Router();

// validate.jwtValidate
router.post('/', validate.jwtValidate, PostControllers.post);
router.get('/', validate.jwtValidate, PostControllers.findAll);
router.get('/:id', validate.jwtValidate, PostControllers.findById);
router.put('/:id', validate.jwtValidate, PostControllers.putById);
router.delete('/:id', validate.jwtValidate, PostControllers.deletePostById);
module.exports = router;