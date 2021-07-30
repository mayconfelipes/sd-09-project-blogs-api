const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });

  return postsCategories;
};

module.exports = PostsCategories;
