const rescue = require('express-rescue');
// const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const PostVerify = require('../services/utils/postSchema');
const PostService = require('../services/Post');
const PostUpdVerify = require('../services/utils/postUpdSchema');

const post = rescue(async (req, res, next) => {
    const { error } = PostVerify.validate(req.body);
   if (error) next(error);
     const { id, userId, title, content } = await PostService.post(req.body, req.user.email);
         res.status(201).json({ id, userId, title, content });
});

const findAll = rescue(async (req, res) => {
    const allPost = await PostService.findAll();
    res.status(200).json(allPost);
});

const findById = rescue(async (req, res) => {
    const { id } = req.params;
    const idPost = await PostService.findById(id);
    console.log(idPost);
    res.status(200).json(idPost);
});

const putById = rescue(async (req, res, next) => {
    const { id } = req.params;
     
    const { error } = PostUpdVerify.validate(req.body);
    if (Object.keys(req.body).includes('categoryIds')) {
        throw boom.badRequest('Categories cannot be edited');
    }
    if (error) next(error);
    const idPost = await PostService.putById(id, req.body, req.user);
    res.status(200).json(idPost);
});

const deletePostById = rescue(async (req, res) => {
    const { id } = req.params;
    await PostService.deletePostById(id, req.user);
    res.status(204).json();
});

const findByTitleContent = rescue(async (req, res) => {
    res.status(200).json({ message: 'find by titlhe' });
});
module.exports = { post, findAll, findById, putById, deletePostById, findByTitleContent };