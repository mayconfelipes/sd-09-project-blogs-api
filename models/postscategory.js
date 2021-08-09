const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });

  postsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategory;
};

// ver: https://app.betrybe.com/course/back-end/arquitetura-solid-e-orm/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d/conteudos/2aa771d8-9e5f-45ff-918a-08f5e3be9548/relacionamentos-nn/42263e2a-46ff-4209-b083-aff4a10db529?use_case=side_bar

module.exports = PostsCategory;
