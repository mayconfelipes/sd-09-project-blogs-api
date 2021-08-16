const configPostsCategories = () => ({
  timestamps: false,
  tableName: 'PostsCategories',
  underscore: true,
});

const associatePostsCategories = (models, PostsCategories) => {
  models.Categories.belongsToMany(models.BlogPosts, {
    as: 'posts',
    through: PostsCategories,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });

  models.BlogPosts.belongsToMany(models.Categories, {
    as: 'categories',
    through: PostsCategories,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define(
    'PostsCategories',
    {},
    configPostsCategories(),
  );

  PostsCategories.associate = (models) => associatePostsCategories(models, PostsCategories);

  return PostsCategories;
};
