module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
  });
  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      through: PostsCategories, foreignKey: 'categoryId', otherKey: 'postId', as: 'blogPostsCat',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      through: PostsCategories, foreignKey: 'postId', otherKey: 'categoryId', as: 'catBlogPosts',
    });
  };
  return PostsCategories;
};

// refatoração realizada após o estudo do pull requeste:
//  https://github.com/tryber/sd-09-project-blogs-api/pulls/34
