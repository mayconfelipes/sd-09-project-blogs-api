module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
  {},
  { timestamps: false });

  PostsCategory.associate = (mod) => {
    mod.BlogPost.belongsToMany(mod.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    mod.Category.belongsToMany(mod.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};
