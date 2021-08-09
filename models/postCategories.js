module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {}, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategories, foreignKey: 'postId', otherKey: 'categoryId', as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategories, foreignKey: 'categoryId', otherKey: 'postId', as: 'blogposts',
    });
  };

  return PostCategories;
};
