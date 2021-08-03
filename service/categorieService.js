const { Categorie } = require('../models');
const categorieController = require('../controller/categorieController');

const createCategorie = (req, res, _next) => {
  const { name } = req.body;
  Categorie.create({ name })
    .then((newCategorie) => {
      const reply = categorieController.createCategorieOk(newCategorie);
      res.status(reply.code).json(reply.categorie);
    })
    .catch((e) => {
      const reply = categorieController.createCategorieError(e.errors[0].message);
      res.status(reply.code).json({ message: reply.phrase });
    });
};

const showAllCategories = (req, res, _next) => {
  Categorie.findAll()
    .then((listCategories) => {
      const reply = categorieController.showAllOk(listCategories);
      res.status(reply.code).send(reply.list);
    });
};

module.exports = {
  createCategorie,
  showAllCategories,
};
