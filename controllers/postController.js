const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
const {
    createPostService,
    createPostCategory,
    findAllBlogPostService,
} = require('../services/postService');

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
        
        await createPostCategory(id, categoryIds);

        return res.status(201).json(postCreated);
    }),
];

const findAllBlogPost = async (req, res) => {
    const allBlogsPosts = await findAllBlogPostService();
    return res.status(200).json(allBlogsPosts);
};

module.exports = {
    createPost,
    findAllBlogPost,
};
