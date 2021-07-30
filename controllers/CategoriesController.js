const CategoriesServices = require('../services/CategoriesServices');

const getAll = async (_req, res) => {
    try {
        const categories = await CategoriesServices.getAll();
        return res.status(200).json(categories);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const addCategorie = async (req, res) => {
    const categorie = await CategoriesServices.addCategorie(req.body);
    if (categorie.message === undefined) {
        return res.status(201).json(categorie);
    }
    return res.status(400).json(categorie);
};

module.exports = { getAll, addCategorie };