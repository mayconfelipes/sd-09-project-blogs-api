const PostCategory = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define(
    'PostCategories',
    {},
    { tableName: 'PostsCategories', timestamps: false },
  );
  PostCategories.associate = (model) => {
    model.Categories.belongsToMany(model.BlogPosts,
      { as: 'blogposts', through: PostCategories, foreignKey: 'postId', otherKey: 'categoryId' });
    model.BlogPosts.belongsToMany(model.Categories,
      { as: 'categories', through: PostCategories, foreignKey: 'categoryId', otherKey: 'postId' });
  };
  return PostCategories;
};

module.exports = PostCategory;