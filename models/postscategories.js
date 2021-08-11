module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define(
    'PostsCategories',
    {},
    { timestamps: false },
  );
  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(
      models.Categories,
      { foreignKey: 'id', as: 'categoryId' },
    );
    PostsCategories.belongsTo(
      models.BlogPosts,
      { foreignKey: 'id', as: 'postId' },
    );
  };
  return PostsCategories;
};
