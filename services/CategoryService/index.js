const { Category } = require('../../models');

module.exports = async () => {
  const result = await Category.findAll({});

  return result;
};
