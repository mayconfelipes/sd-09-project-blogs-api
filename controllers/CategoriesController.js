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

const getByIdCat = async (req, res) => {
    const { id } = req.params;
    const categorie = await CategoriesServices.getbyIdCat(id);
    if (categorie) {
        return res.status(200).json(categorie);
    }
    res.status(404).json({ message: 'Categorie does not exist' });
};

module.exports = { getAll, addCategorie, getByIdCat };