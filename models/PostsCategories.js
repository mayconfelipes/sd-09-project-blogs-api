module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { through: models.PostCategory });
    models.Category.belongsToMany(models.BlogPost, { through: models.PostCategory });
  };

  return PostCategory;
};
