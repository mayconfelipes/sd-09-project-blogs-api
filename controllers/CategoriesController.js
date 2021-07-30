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

module.exports = { getAll };