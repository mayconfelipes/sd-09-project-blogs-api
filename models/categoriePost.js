const createPostsCategory = (sequelize, _DataTypes) => {
  const categoriePost = sequelize.define('categoriePost', {},
  {
    timestamps: false,
  });
/* este codigo foi feito na sala 12 com joao vitor andre e antonio arieiro */
  categoriePost.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories,
      { 
        as: 'categories', through: categoriePost, foreignKey: 'postId', otherKey: 'categoryId',
      });
    models.Categories.belongsToMany(models.BlogPosts,
      { as: 'blogPosts', through: categoriePost, foreignKey: 'categoryId', otherKey: 'postId' });
  };

  return categoriePost;
};

module.exports = createPostsCategory;
/* este codigo foi desenvolvido com a trica de 9 16 : Joao Vitor, Joao Pedro e ANtonio arieiro && WARROM */