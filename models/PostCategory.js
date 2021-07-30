const PostCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
  {},
  { timestamps: false });

  postCategory.associate = (models) => {
    models.Post.belongsToMany(models.Post, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return postCategory;
};

module.exports = PostCategory;
