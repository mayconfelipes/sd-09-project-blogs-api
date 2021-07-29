// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'PostCategories',
  });
  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'id',
      as: 'blogPostsCategories',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'id',
      as: 'categoriesBlogPosts',
    });
  };
  return PostCategories;
};