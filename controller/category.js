const service = require('../services/category');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  const response = await service.createCategory({ name, authorization });
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

module.exports = {
  createCategory,
};