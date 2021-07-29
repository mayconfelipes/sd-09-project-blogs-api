// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
  });
  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPostsCategories',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categoriesBlogPosts',
    });
  };
  return PostsCategories;
};