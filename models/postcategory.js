module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
   { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
   { timestamps: false, tableName: 'PostsCategories' });
  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId', // é preciso linkar as 2 tabelas por isso pega a infos da associate acima.
      otherKey: 'postId', // id do BlogPosts
    });
  };
  return PostCategory;
};