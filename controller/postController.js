const express = require('express');
const { auth } = require('../middlewares/auth');
const { BlogPost } = require('../models');
const { CREATE } = require('../ultils');
const post = require('../middlewares/post');

const router = express.Router();

router.post('/', auth, post.validatePost, async (req, res) => {
    const userId = req.user.id; // salvo o pauload na variavel da middleware
    // console.log(userId);
    const { title, content, categoryIds } = req.body;

    const postUsers = await BlogPost.create({ title, content, userId, categoryIds });
    return res.status(CREATE).json(postUsers);
});

module.exports = router;