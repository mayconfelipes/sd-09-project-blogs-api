const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
const { createPostService, createPostCategory } = require('../services/postService');

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
});

const createPost = [
    validate(postSchema),
    rescue(async (req, res, next) => {
        const { title, content, categoryIds } = req.body;
        const { id } = req.user;
        const postCreated = await createPostService(title, content, categoryIds, id);
        
        if (postCreated.error) return next({ statusCode: 400, message: postCreated.error });
        
        const teste = await createPostCategory(id, categoryIds);
        console.log(teste);
        return res.status(201).json(postCreated);
    }),
];

module.exports = {
    createPost,
};
