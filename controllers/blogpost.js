const rescue = require('express-rescue');
const joi = require('joi');

const { sequelize } = require('../models');
const { BlogPost, User, Category } = require('../models');

const create = rescue(async (req, res, next) => {
    const { error } = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        categoryIds: joi.array().required(),
    })
        .validate(req.body);

    if (error) return next(error);

    const { title, content, categoryIds } = req.body;

    await sequelize.transaction(async (transaction) => {
        const blogPost = await BlogPost.create({ title, content, userId: req.id }, { transaction });

        try {
            await blogPost.addCategories((categoryIds), { transaction });
        } catch (err) {
            await transaction.rollback();
            return next({ message: '"categoryIds" not found', code: 400 });
        }

        res.status(201).json(blogPost);
    });
});

const read = rescue(async (_, res) => {
    const blogPosts = await BlogPost.findAll(
        {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
        },
    );

    res.status(200).json(blogPosts);
});

const readById = rescue(async (req, res) => {
    const { id } = req.params;

    const blogPost = await BlogPost.findOne({
        where: { id },
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    if (!blogPost) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    res.status(200).json(blogPost);
});

const update = rescue(async (req, res, next) => {
    const { categoryIds } = req.body;

    if (categoryIds) return next({ message: 'Categories cannot be edited', code: 400 });

    const { error } = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
    })
        .validate(req.body);

    if (error) return next(error);

    const { id } = req.params;

    const { title, content } = req.body;

    const { categories, userId } = await BlogPost.findOne({
        where: { id },
        include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (req.id !== userId) return next({ message: 'Unauthorized user', code: 401 });

    await sequelize.transaction(async (transaction) =>
        BlogPost.update({ title, content }, { where: { id } }, { transaction }));

    res.status(200).json({ title, content, userId, categories });
});

const remove = rescue(async (req, res, next) => {
    const { id } = req.params;

    const blogPost = await BlogPost.findOne({
        where: { id },
    });

    if (!blogPost) return next({ message: 'Post does not exist', code: 404 });

    if (req.id !== blogPost.userId) return next({ message: 'Unauthorized user', code: 401 });

    await sequelize.transaction(async (transaction) => BlogPost
    .destroy({ where: { id } }, { transaction }));

    res.sendStatus(204);
});

const removeSelf = rescue(async (req, res) => {
    await sequelize.transaction(async (transaction) => User
    .destroy({ where: { id: req.id } }, { transaction }));

    res.sendStatus(204);
});

module.exports = {
    create,
    read,
    readById,
    update,
    remove,
    removeSelf,
};