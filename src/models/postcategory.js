const PostCategory = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostsCategories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  { timestamps: false });
  return PostCategoryModel;
};
module.exports = PostCategory;