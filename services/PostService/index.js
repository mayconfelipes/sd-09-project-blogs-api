const { BlogPost } = require('../../models');

module.exports = async () => {
  const result = await BlogPost.findAll({});

  return result;
};
