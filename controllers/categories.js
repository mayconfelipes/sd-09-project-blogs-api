const categoriesService = require('../services/categories');

const cretaeCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await categoriesService.createCategory(name);
    res.status(201).json(response);
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
  }
};

const listCategories = async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await categoriesService.listCategories(name);
    res.status(200).json(response);
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
  }
};

module.exports = {
  cretaeCategory,
  listCategories,
};