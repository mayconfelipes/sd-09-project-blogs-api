const PostCategory = (sequelize, _DataTypes) => {
  const definePostCategory = sequelize.define('PostsCategory', {},
  { timestamps: false });
  definePostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: definePostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: definePostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
  });
};
  return definePostCategory;
};

module.exports = PostCategory; 