module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });
  PostCategory.associate = (models) => {
    models.PostCategory.belongsToMany(models.User, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'userId',
    });
    models.PostCategory.hasOne(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'CategoryId',
    });
  };
  return PostCategory;
};