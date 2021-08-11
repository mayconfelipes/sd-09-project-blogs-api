module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define(
    'PostsCategories',
    {},
    { timestamps: false },
  );
  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(
      models.Categories,
      { foreignKey: 'categoryId', as: 'categoryId' },
    );
    PostsCategories.belongsTo(
      models.BlogPosts,
      { foreignKey: 'postId', as: 'postId' },
    );
  };
  return PostsCategories;
};
