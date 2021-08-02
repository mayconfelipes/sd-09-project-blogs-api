const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
const {
    insertCategorie,
    findAllCategories,
} = require('../services/categorieService');

const categorieSchema = Joi.object({
    name: Joi.string().required(),
});

const createCategorie = [
    validate(categorieSchema),
    rescue(async (req, res) => {
        const { name } = req.body;
        const categoriInserted = await insertCategorie(name);
        res.status(201).json(categoriInserted);
    }),
];

const findCategories = rescue(async (req, res) => {
    const allCategories = await findAllCategories();
    return res.status(200).json(allCategories); 
});

module.exports = {
    createCategorie,
    findCategories,
};
