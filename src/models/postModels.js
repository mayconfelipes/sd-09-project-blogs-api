const { BlogPost } = require('../sequelize/models');

const postNewPost = async ({ userId, title, content }) => {
  const result = await BlogPost.create({ userId, title, content });
  
  return result;
};

module.exports = {
  postNewPost,
};