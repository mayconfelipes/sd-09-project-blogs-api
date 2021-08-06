const CategoryService = require('../../services/CategoryService');

module.exports = async (_req, res) => {
  const result = await CategoryService();

  res.status(200).json(result);
};
