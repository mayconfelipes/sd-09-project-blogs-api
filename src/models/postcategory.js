const PostCategory = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  { timestamps: false });
  return PostCategoryModel;
};
module.exports = PostCategory;