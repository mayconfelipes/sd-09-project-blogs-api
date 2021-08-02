module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define(
    'PostCategories',
    {},
    { timestamps: false },
  );
  PostCategories.associate = (models) => {
    PostCategories.hasOne(
      models.Categories,
      { foreignKey: 'categoryId', as: 'id' },
    );
    PostCategories.hasOne(
      models.BlogPosts,
      { foreignKey: 'postId', as: 'id' },
    );
  };
  return PostCategories;
};
