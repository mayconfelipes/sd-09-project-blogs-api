const { Categories } = require('../models');
const validationCategorie = require('../middlewares/validationCategorie');

const getAll = async () => {
    const categories = await Categories.findAll();
    return categories;
};

const addCategorie = async (body) => {
    const validate = validationCategorie(body);
    const { message } = validate;
    if (!message) {
        const categorie = await Categories.create(body);
        return categorie;
    }
    return { message };
};

const getbyIdCat = async (id) => {
    if (id) {
        const categorie = await Categories.findOne({
            where: { id },
        });
        return categorie;
    } return null;
};
module.exports = { getAll, addCategorie, getbyIdCat };