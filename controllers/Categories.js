const rescue = require('express-rescue');
const CategoriesService = require('../services/Categories');
const CategoryVerify = require('../services/utils/categorySchema');

const createCategory = rescue(async (req, res, next) => {
     const { error } = CategoryVerify.validate(req.body);

     if (error) { next(error); }
    const { id, name } = await CategoriesService.createCategory({ ...req.body });
    res.status(201).json({ id, name });
});
const findAll = rescue(async (req, res) => {
    const allCategories = await CategoriesService.findAll();
    res.status(200).json(allCategories);
});

module.exports = { createCategory, findAll };