// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'blog',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  
    models.Category.belongsToMany(models.BlogPost, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};