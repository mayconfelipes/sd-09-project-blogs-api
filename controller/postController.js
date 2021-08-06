const express = require('express');
const { auth } = require('../middlewares/auth');
const { BlogPost, Categorie } = require('../models');
const { CREATE, OK } = require('../ultils');
const post = require('../middlewares/post');

const User = require('../models/user');

const router = express.Router();

router.post('/', auth, post.validatePost, async (req, res) => {
    const userId = req.user.id; // salvo o payload da auth na variavel da middleware
    // console.log(userId);
    const { title, content, categoryIds } = req.body;

    const postUsers = await BlogPost.create({ title, content, userId, categoryIds });
    return res.status(CREATE).json(postUsers);
});

router.get('/', auth, async (_req, res) => {
    const getAll = await BlogPost.findAll({ include: [
        { model: User, as: 'user' },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
    ] });

    return res.status(OK).json(getAll);
});

module.exports = router;