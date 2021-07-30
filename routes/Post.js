const express = require('express');
const { validatePost } = require('../middlewares/validations');
const postController = require('../controllers/postController');
const verificCategorie = require('../middlewares/verificCategorie');
const authToken = require('../middlewares/authToken');
const { isValidUser, notExistPost } = require('../middlewares/verificPost');

const postRouter = express.Router();

postRouter.post('/', validatePost, verificCategorie, authToken, postController.createPost);

postRouter.get('/', authToken, postController.getAllPost);

postRouter.get('/:id', authToken, postController.getById);

postRouter.put('/:id', authToken, postController.editPost);

postRouter.delete('/:id', authToken, notExistPost, isValidUser, postController.deletePost);

module.exports = postRouter;