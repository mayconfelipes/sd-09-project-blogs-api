module.exports = (sequelize, _DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {}, { timestamps: true });
  BlogPost.associate = (models) => {
    models.User.hasOne(models.BlogPost, {
      as: 'blogPosts',
      through: BlogPost,
      foreignKey: 'userId',
      otherKey: 'id',
    });
    models.BlogPost.belongsToMany(models.User, {
      as: 'users',
      through: BlogPost,
      foreignKey: 'id',
      otherKey: 'userId',
    });
  };
  return BlogPost;
};