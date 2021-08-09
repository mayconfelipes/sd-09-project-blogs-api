const PostCategory = (sequelize, _DataTypes) => {
  const postcategory = sequelize.define(
    'PostCategory',
    {}, {
      timestamps: false,
      tableName: 'PostsCategories',
    },
  );
  postcategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', through: postcategory, foreignKey: 'postId', otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', through: postcategory, foreignKey: 'categoryId', otherKey: 'postId',
    });
  };
  return postcategory;
};

module.exports = PostCategory;
