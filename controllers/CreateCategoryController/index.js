const CreateCategoryService = require('../../services/CreateCategoryService');

module.exports = async (req, res) => {
  const { body } = req;
  const result = await CreateCategoryService(body);

  res.status(201).json(result);
};
