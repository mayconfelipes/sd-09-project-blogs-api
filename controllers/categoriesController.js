const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
const {
    insertCategory,
    findAllCategories,
} = require('../services/categoryService');

const categorieSchema = Joi.object({
    name: Joi.string().required(),
});

const createCategory = [
    validate(categorieSchema),
    rescue(async (req, res) => {
        const { name } = req.body;
        const categoriInserted = await insertCategory(name);
        return res.status(201).json(categoriInserted);
    }),
];

const findCategories = rescue(async (req, res) => {
    const allCategories = await findAllCategories();
    return res.status(200).json(allCategories); 
});

module.exports = {
    createCategory,
    findCategories,
};
