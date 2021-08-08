const categoriesServices = require('../services/categoriesServices');

async function addCategory(req, res) {
  const { name } = req.body;
  const { authorization: token } = req.headers;
  const { status, response } = await categoriesServices.addCategory(name, token);
  return res.status(status).json(response);
}

async function getCategories(req, res) {
  const { authorization: token } = req.headers;
  const { status, response } = await categoriesServices.getCategories(token);
  return res.status(status).json(response);
}

module.exports = {
  addCategory,
  getCategories,
};
