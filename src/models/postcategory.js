const PostCategory = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('Category', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  { timestamps: false });
  // PostCategoryModel.associate = (models) => {
  //   models.Category.belongsToMany(models.BlogPost, {
  //     through: PostCategory,
  //     foreignKey: 'id',
  //     otherKey: 'id',
  //   });
  //   models.BlogPost.belongsToMany(models.Category, {
  //     through: PostCategory,
  //     foreignKey: 'id',
  //     otherKey: 'id',
  //   });
  // };
  return PostCategoryModel;
};
module.exports = PostCategory;